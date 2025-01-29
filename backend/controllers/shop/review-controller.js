const Order = require("../../models/order");
const Product = require("../../models/product");
const ProductReview = require("../../models/review");

const addProductReview = async (req, res) => {
	try {
		const { productId, userId, username, reviewMessage, reviewValue } =
			req.body;

		const order = await Order.findOne({
			user: userId,
			"items.productId": productId,
		});

		if (!order) {
			return res.status(403).json({
				success: false,
				message: "You need to purchase product to review it.",
			});
		}

		const checkExistingReview = await ProductReview.findOne({
			productId: productId,
			userId: userId,
		});

		if (checkExistingReview) {
			return res.status(400).json({
				success: false,
				message: "You already reviewed this product!",
			});
		}

		const newReview = new ProductReview({
			productId,
			userId,
			username,
			reviewMessage,
			reviewValue,
		});

		await newReview.save();

		const reviews = await ProductReview.find({ productId });
		const totalReviewsLength = reviews.length;
		let averageReview = 0;
		if (totalReviewsLength > 0) {
			averageReview =
				reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
				totalReviewsLength;
		}

		await Product.findByIdAndUpdate(productId, { averageReview });

		res.status(201).json({
			success: true,
			data: newReview,
		});
	} catch (e) {
		console.log(e);
		res.status(500).json({
			success: false,
			message: "Error",
		});
	}
};

const getProductReviews = async (req, res) => {
	try {
		const { productId } = req.params;

		const reviews = await ProductReview.find({ productId });
		res.status(200).json({
			success: true,
			data: reviews,
		});
	} catch (e) {
		console.log(e);
		res.status(500).json({
			success: false,
			message: "Error",
		});
	}
};

const deleteProductReview = async (req, res) => {
	try {
		const { id } = req.params;
		const review = await ProductReview.findByIdAndDelete(id)

		if (!review) {
			return res.status(400).json({
				success: false,
				message: "The review does not exist!",
			});
		}
		const productId = review.productId;
		const reviews = await ProductReview.find({ productId });
		const totalReviewsLength = reviews.length;
		let averageReview = 0;
		if (totalReviewsLength!==0){
			averageReview =
				reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
				totalReviewsLength;
		}
		await Product.findByIdAndUpdate(productId, { averageReview });

		res.status(200).json({
			success: true,
			message: "Review delete successfully",
		});
	}
	catch (e) {
		console.log(e);
		res.status(500).json({
			success: false,
			message: "Error",
		});
	}
}

module.exports = { addProductReview, getProductReviews, deleteProductReview };