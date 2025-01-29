import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchAllReviews } from "../../redux/adminSlice/reviews/index.js";
import { motion } from "framer-motion";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button} from "react-bootstrap";
import {deleteReview} from "../../redux/shopSlice/reviews/index.js";

function AdminReviews() {
	const dispatch = useDispatch();
	const { productList, isLoading } = useSelector((state) => state.adminReview);
	const [filterStars, setFilterStars] = useState("All");

	useEffect(() => {
		dispatch(fetchAllReviews());
	}, [dispatch]);

	if (isLoading) {
		return <div className="text-center text-lg font-bold mt-24">Loading...</div>;
	}

	const filteredReviews = filterStars === "All"
		? productList
		: productList.filter(review => review.reviewValue.toString() === filterStars);

	const handleDelete = (reviewID) => {
		dispatch(deleteReview(reviewID)).then((data) => {
			if (data?.payload?.success) {
				alert("Review deleted successfully");
				dispatch(fetchAllReviews());
			}
		});
	};

	return (
		<div className="p-6 max-w-4xl mx-auto mt-24">
			<div className="mb-6 flex items-center bg-gray-100 p-3 rounded-lg shadow">
				<label className="mr-3 font-bold text-gray-700">Filter by Rating:</label>
				<select
					value={filterStars}
					onChange={(e) => setFilterStars(e.target.value)}
					className="border p-2 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
				>
					<option value="All">All</option>
					<option value="1">1 Star</option>
					<option value="2">2 Stars</option>
					<option value="3">3 Stars</option>
					<option value="4">4 Stars</option>
					<option value="5">5 Stars</option>
				</select>
			</div>
			{filteredReviews.length > 0 ? (
				filteredReviews.map((review) => (
					<motion.div
						key={review._id}
						className="mb-4 border-2 border-black rounded-lg shadow-lg bg-white p-4 mx-2"
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
					>
						<h3 className="font-bold text-lg">{review.productId?.title}</h3>
						<p><strong>Username:</strong> {review.username}</p>
						<p><strong>Review:</strong> {review.reviewMessage}</p>
						<p><strong>Rating:</strong> {"⭐".repeat(review.reviewValue)}</p>
						<p><strong>Created At:</strong> {new Date(review.createdAt).toLocaleString()}</p>
						<Button onClick={() => handleDelete(review._id)}
								className="bg-red-500 text-white px-3 py-1 rounded">Delete
						</Button>
					</motion.div>
				))
			) : (
				<p className="text-center text-gray-500">No reviews available.</p>
			)}
		</div>
	);
}

export default AdminReviews;