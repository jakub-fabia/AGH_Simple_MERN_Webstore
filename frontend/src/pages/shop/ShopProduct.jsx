import {useNavigate, useParams} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchProductDetails } from "../../redux/shopSlice/products/index.js";
import { getReviews, addReview, deleteReview } from "../../redux/shopSlice/reviews/index.js";
import {addToCart} from "../../redux/shopSlice/cart/index.js";
import {capturePayment} from "../../redux/shopSlice/order/index.js";

function ShopProduct() {
	const { id } = useParams();
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.auth);
	const { productDetails } = useSelector((state) => state.shopProducts);
	const { reviews } = useSelector((state) => state.shopReview);
	const [quantity, setQuantity] = useState(1);
	const [reviewMessage, setReviewMessage] = useState("");
	const [reviewValue, setReviewValue] = useState(5);
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(fetchProductDetails(id));
		dispatch(getReviews(id));
	}, [id, dispatch]);

	const handleAddToCart = async () => {
		await dispatch(
			addToCart({
				userId: user?.id,
				productId: productDetails?._id,
				quantity: quantity,
			})
		).unwrap();
		navigate('/shop/cart')
	};

	function handleAddReview() {
		if(reviewMessage === ""){
			alert("Please fill the review!")
			return;
		}
		dispatch(
			addReview({
				productId: productDetails?._id,
				userId: user?.id,
				username: user?.username,
				reviewMessage: reviewMessage,
				reviewValue: reviewValue,
			})
		).then((data) => {
			if (data.payload.success) {
				setReviewValue(5);
				setReviewMessage("");
				dispatch(getReviews(productDetails?._id));
				alert("Review added successfully!")
			}
		});
	}

	const handleDeleteReview = (reviewId) => {
		dispatch(deleteReview(reviewId));
		dispatch(getReviews(productDetails?._id));
	};

	return (
		<div className="p-6">
			{productDetails ? (
				<>
					{/* Product Details */}
					<div className="flex flex-col md:flex-row items-center gap-8 mb-12">
						<img
							src={productDetails.image}
							alt={productDetails.title}
							className="w-full md:w-1/2 h-96 object-cover rounded-lg shadow-lg"
						/>
						<div className="flex-1">
							<h1 className="text-3xl font-bold mb-4">
								{productDetails.title}
							</h1>
							<p className="text-lg text-gray-700 mb-4">
								{productDetails.description}
							</p>
							<p className="text-2xl font-semibold text-green-600 mb-4">
								${productDetails.price}
							</p>
							<p className="text-sm text-gray-500 mb-6">
								Stock: {productDetails.stock}
							</p>
							<div className="flex items-center gap-4 mb-6">
								<div className="flex items-center gap-2">
									<button
										onClick={() =>
											setQuantity((prev) =>
												prev > 1 ? prev - 1 : 1
											)
										}
										className="px-3 py-2 bg-gray-200 rounded-lg"
									>
										-
									</button>
									<span className="px-4 py-2 bg-gray-100 rounded-lg">
                                        {quantity}
                                    </span>
									<button
										onClick={() =>
											setQuantity((prev) => prev < productDetails.stock ? prev + 1 : productDetails.stock)
										}
										className="px-3 py-2 bg-gray-200 rounded-lg"
									>
										+
									</button>
								</div>
								<button
									onClick={handleAddToCart}
									className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
								>
									Add to Cart
								</button>
							</div>
						</div>
					</div>

					{/* Reviews Section */}
					<div>
						<h2 className="text-2xl font-bold mb-4">Reviews</h2>

						{/* Add Review */}
						<div className="mb-6">
                            <textarea
								value={reviewMessage}
								onChange={(e) => setReviewMessage(e.target.value)}
								placeholder="Write your review..."
								className="w-full p-4 border rounded-lg mb-2"
								rows="3"
							></textarea>
							<div className="flex items-center gap-4 mb-4">
								<label className="text-sm text-gray-700">
									Rating:
								</label>
								<select
									value={reviewValue}
									onChange={(e) =>
										setReviewValue(Number(e.target.value))
									}
									className="p-2 border rounded-lg"
								>
									{[1, 2, 3, 4, 5].map((value) => (
										<option key={value} value={value}>
											{value}
										</option>
									))}
								</select>
							</div>
							<button
								onClick={handleAddReview}
								className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
							>
								Submit Review
							</button>
						</div>

						{/* Display Reviews */}
						{reviews && reviews.length > 0 ? (
							reviews.map((review) => (
								<div
									key={review._id}
									className="border rounded-lg p-4 mb-4 relative"
								>
									<h3 className="text-lg font-semibold mb-2">
										{review.username}
									</h3>
									<p className="text-gray-600 mb-2">
										{review.reviewMessage}
									</p>
									<p className="text-sm text-gray-500">
										Rating: {review.reviewValue}/5
									</p>
									{/* Show Delete Button for User's Own Reviews */}
									{user?.id === review.userId && (
										<button
											onClick={() =>
												handleDeleteReview(review._id)
											}
											className="absolute top-2 right-2 px-3 py-1 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700"
										>
											Delete
										</button>
									)}
								</div>
							))
						) : (
							<p>No reviews available for this product.</p>
						)}
					</div>
				</>
			) : (
				<div className="flex justify-center items-center h-screen">
					<div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-600"></div>
				</div>
			)}
		</div>
	);
}

export default ShopProduct;
