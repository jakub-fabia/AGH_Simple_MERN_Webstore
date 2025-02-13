const Review = require("../../models/review.js");
const Product = require("../../models/product.js");

const fetchAllReviews = async (req, res) => {
	try {
		const reviews = await Review.find({}).populate("productId", "title");

		if (!reviews.length) {
			return res.status(404).json({
				success: false,
				message: "No reviews found!",
			});
		}

		res.status(200).json({
			success: true,
			data: reviews,
		});
	} catch (e) {
		console.log(e);
		res.status(500).json({
			success: false,
			message: "Some error occurred!",
		});
	}
}

const removeReview = async (req, res) => {
	try {
		const { id } = req.params;
		const review = await Review.findByIdAndDelete(id);

		if (!review)
			return res.status(404).json({
				success: false,
				message: "Review not found",
			});
		const productId = review.productId.toString();
		console.log(productId);
		const reviews = await Review.find({ productId });
		const totalReviewsLength = reviews.length;
		let averageReview = 0;
		if (totalReviewsLength > 0) {
			averageReview =
				reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
				totalReviewsLength;
		}

		await Product.findByIdAndUpdate(productId, { averageReview });

		res.status(200).json({
			success: true,
			message: "Review delete successfully",
		});
	} catch (e) {
		console.log(e);
		res.status(500).json({
			success: false,
			message: "Error occurred",
		});
	}
}

module.exports = {
	removeReview,
	fetchAllReviews
}