import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchAllReviews } from "../../redux/adminSlice/reviews/index.js";
import {Button, Card} from "react-bootstrap";
import {deleteReview} from "../../redux/adminSlice/reviews/index.js";
import "./AdminReviews.css"

function AdminReviews() {
	const dispatch = useDispatch();
	const { productList, isLoading } = useSelector((state) => state.adminReview);

	useEffect(() => {
		dispatch(fetchAllReviews());
	}, [dispatch]);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	const handleDelete = (reviewId) => {
		dispatch(deleteReview(reviewId)).then(() => dispatch(fetchAllReviews()));
	}

	return (
		<div>
			<h2>Admin Reviews</h2>
			{productList && productList.length > 0 ? (
				productList.map((review) => (
					<Card key={review._id} className="review-card">
						<h3>{review.productId?.title}</h3>
						<p><strong>Username:</strong> {review.username}</p>
						<p><strong>Review:</strong> {review.reviewMessage}</p>
						<p><strong>Rating:</strong> {review.reviewValue}</p>
						<p><strong>Created At:</strong> {new Date(review.createdAt).toLocaleString()}</p>
						<Button
							variant="danger"
							color="secondary"
							onClick={() => handleDelete(review._id)}
						>
							Delete
						</Button>
					</Card>
				))
			) : (
				<p>No reviews available.</p>
			)}
		</div>
	);
}

export default AdminReviews;
