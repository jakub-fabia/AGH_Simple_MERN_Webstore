const Review = require("../../models/review.js");

const fetchAllReviews = async (req, res) => {
	try {
		const reviews = await Review.find({});

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
			message: "Some error occured!",
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

		res.status(200).json({
			success: true,
			message: "Review delete successfully",
		});
	} catch (e) {
		console.log(e);
		res.status(500).json({
			success: false,
			message: "Error occured",
		});
	}
}

module.exports = {
	removeReview,
	fetchAllReviews
}