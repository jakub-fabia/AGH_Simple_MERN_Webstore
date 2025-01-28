const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema(
    {
        productId: String,
        userId: String,
        username: String,
        reviewMessage: String,
        reviewValue: Number,
    },
    { timestamps: true }
);

const Review = mongoose.model("ProductReview", reviewSchema);

module.exports = Review