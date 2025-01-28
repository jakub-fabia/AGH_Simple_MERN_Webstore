import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchProductDetails } from "../../redux/shopSlice/products/index.js";
import { getReviews } from "../../redux/shopSlice/reviews/index.js";

function ShopProduct() {
	const { id } = useParams();
	const dispatch = useDispatch();
	const { productDetails } = useSelector((state) => state.shopProducts);
	const { reviews } = useSelector((state) => state.shopReview);
	const [quantity, setQuantity] = useState(1);

	useEffect(() => {
		dispatch(fetchProductDetails(id));
		dispatch(getReviews(id));
	}, [id, dispatch]);

	const handleAddToCart = () => {
		// Add to cart logic here
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
								${productDetails.price.toFixed(2)}
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
											setQuantity((prev) => prev + 1)
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
						{reviews && reviews.length > 0 ? (
							reviews.map((review) => (
								<div
									key={review.id}
									className="border rounded-lg p-4 mb-4"
								>
									<h3 className="text-lg font-semibold mb-2">
										{review.author}
									</h3>
									<p className="text-gray-600 mb-2">
										{review.comment}
									</p>
									<p className="text-sm text-gray-500">
										Rating: {review.rating}/5
									</p>
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
