const express = require("express");

const {
	fetchAllReviews,
	removeReview
} = require("../controllers/admin/admin-reviews-controller.js");

const router = express.Router();

router.delete("/delete/:id", removeReview);
router.get("/get", fetchAllReviews);

module.exports = router;