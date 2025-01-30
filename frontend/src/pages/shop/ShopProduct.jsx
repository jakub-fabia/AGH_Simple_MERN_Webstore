import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useCallback } from "react";
import { fetchProductDetails } from "../../redux/shopSlice/products";
import { getReviews, addReview, deleteReview } from "../../redux/shopSlice/reviews";
import { addToCart } from "../../redux/shopSlice/cart";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { FaStar } from "react-icons/fa";

function ShopProduct() {
	const { id } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { user } = useSelector((state) => state.auth);
	const { productDetails } = useSelector((state) => state.shopProducts);
	const { reviews } = useSelector((state) => state.shopReview);

	const [quantity, setQuantity] = useState(1);
	const [reviewMessage, setReviewMessage] = useState("");
	const [reviewValue, setReviewValue] = useState(5);

	useEffect(() => {
		if (id) {
			dispatch(fetchProductDetails(id));
			dispatch(getReviews(id));
		}
	}, [id, dispatch]);

	const handleAddToCart = async () => {
		await dispatch(
			addToCart({
				userId: user?.id,
				productId: productDetails?._id,
				quantity: quantity,
			})
		).unwrap();
		navigate('/shop/cart');
	};

	const handleAddReview = useCallback(() => {
		if (!reviewMessage.trim()) {
			alert("Please enter a review message.");
			return;
		}
		dispatch(addReview({ productId: productDetails?._id, userId: user?.id, username: user?.username, reviewMessage, reviewValue }))
			.then(({ payload }) => {
				if (payload?.success) {
					setReviewMessage("");
					setReviewValue(5);
					dispatch(getReviews(productDetails?._id));
					alert("Review added successfully!");
				} else {
					alert("Failed to add review.");
				}
			});
	}, [dispatch, productDetails, user, reviewMessage, reviewValue]);

	const handleDeleteReview = useCallback((reviewId) => {
		dispatch(deleteReview(reviewId)).then(() => dispatch(getReviews(productDetails?._id)));
	}, [dispatch, productDetails]);

	return (
		<div style={styles.centeredContainer}>
			<Container>
				<Row className="my-4">
					<Col md={4} style={styles.imageContainer}>
						<img src={productDetails?.image} alt={productDetails?.title} className="img-fluid" style={styles.productImage} />
					</Col>
					<Col md={6}>
						<h1>{productDetails?.title}</h1>
						<p>{productDetails?.description}</p>
						<h3>${productDetails?.price?.toFixed(2)}</h3>
						<p>Stock: {productDetails?.stock}</p>
						<Form>
							<Form.Group controlId="quantity">
								<Form.Label>Quantity</Form.Label>
								<Form.Control type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} min="1" />
							</Form.Group>
						</Form>
						<br />
						<Button onClick={handleAddToCart} variant="dark">Add to Cart</Button>
					</Col>
				</Row>
				<br />
				<Row>
					<Col md={8}>
                        <textarea
							value={reviewMessage}
							onChange={(e) => setReviewMessage(e.target.value)}
							placeholder="Write your review..."
							className="w-full p-4 border rounded-lg mb-2"
							rows="3"
							style={{ width: "100%", marginLeft: "30px" }}
						></textarea>
					</Col>
					<Col md={3} style={{ marginLeft: "40px" }}>
						<Row style={{ alignItems: "center" }}>
							<div className="flex items-center gap-4 mb-4">
								<label className="text-sm text-gray-700" style={{ marginRight: "10px" }}>
									Rating:
								</label>
								{[1, 2, 3, 4, 5].map((star) => (
									<FaStar
										key={star}
										size={24}
										color={star <= reviewValue ? "#FFD700" : "#e4e5e9"}
										onClick={() => setReviewValue(star)}
										style={{ cursor: "pointer" }}
									/>
								))}
							</div>
						</Row>
						<Row>
							<Button
								onClick={handleAddReview}
								className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
								variant="dark"
							>
								Submit Review
							</Button>
						</Row>
					</Col>
				</Row>
				<Row className="my-4">
					{reviews?.length ? (
						reviews.map((review) => (
							<div key={review._id} className="p-4 border rounded-lg bg-white shadow-md mb-4 relative">
								<h3 className="text-lg font-semibold text-gray-900 mb-2">{review.username}</h3>
								<p className="text-gray-700 mb-2 leading-relaxed">{review.reviewMessage}</p>
								<p className="text-sm text-gray-500">
									Rating: {[...Array(review.reviewValue)].map((_, i) => (
									<FaStar key={i} size={16} color="#FFD700" />
								))}
								</p>
								{user?.id === review.userId && (
									<button onClick={() => handleDeleteReview(review._id)} className="btn btn-danger btn-sm">Delete</button>
								)}
							</div>
						))
					) : (
						<p className="text-gray-500" style={styles.noReviews}>No reviews available for this product.</p>
					)}
				</Row>
			</Container>
		</div>
	);
}

export default ShopProduct;

const styles = {
	centeredContainer: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		minHeight: "100vh",
	},
	imageContainer: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		marginLeft: "70px",
		marginRight: "40px",
	},
	productImage: {
		maxWidth: "100%",
		maxHeight: "800px",
		border: "3px solid black",
		borderRadius: "15px",
	},
	noReviews: {
		marginLeft: "100px",
	},
};
