import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { deleteProduct, fetchAllProducts } from "../../redux/adminSlice/products/index.js";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import {FaStar} from "react-icons/fa";

function AdminProducts() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { productList, isLoading } = useSelector((state) => state.adminProducts);

	useEffect(() => {
		dispatch(fetchAllProducts());
	}, [dispatch]);

	function handleDelete(productID) {
		dispatch(deleteProduct(productID)).then((data) => {
			if (data?.payload?.success) {
				dispatch(fetchAllProducts());
			}
		});
	}

	function handleEdit(productID) {
		navigate(`/admin/products/edit/${productID}`);
	}

	function renderStars(rating) {
		let stars = [];
		for (let i = 0; i < Math.floor(rating); i++) {
			stars.push(<FaStar key={i} className="text-yellow-500" />);
		}
		return stars.length > 0 ? stars : <span>No reviews</span>;
	}

	return (
		<Container>
			<h1 className="my-4 text-center">Products</h1>
			<Row className="d-flex justify-content-start">
				{productList && productList.length > 0 ? (
					productList.map((product) => (
						<Col key={product._id} sm={12} md={6} lg={4} className="mb-4">
							<Card className="h-100 shadow-lg border-0">
								<Card.Img
									variant="top"
									src={product.image}
									alt={product.title}
									className="product-img"
									style={styles.cardImg}
								/>
								<Card.Body className="d-flex flex-column">
									<Card.Title>{product.title}</Card.Title>
									<Card.Text>{product.description.substring(0, 100)}...</Card.Text>
									<div className="d-flex justify-content-between align-items-center mt-auto">
										<h5>${product.price.toFixed(2)}</h5>
										<div>
											<strong>Stars: </strong>
											<div className="d-flex">{renderStars(product.averageReview)}</div>
										</div>
									</div>
									<div className="mt-3 d-flex justify-content-between">
										<Button
											variant="primary"
											onClick={() => handleEdit(product._id)}
										>
											Modify
										</Button>
										<Button
											variant="danger"
											onClick={() => handleDelete(product._id)}
										>
											Delete
										</Button>
									</div>
								</Card.Body>
							</Card>
						</Col>
					))
				) : (
					<p className="text-center w-100">No products available.</p>
				)}
			</Row>
		</Container>
	);
}

export default AdminProducts;

const styles = {
	cardImg: {
		height: '200px',
		width: '100%',
		objectFit: 'contain',
		objectPosition: 'center'
	}
};
