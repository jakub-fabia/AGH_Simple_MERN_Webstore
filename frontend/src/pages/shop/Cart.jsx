import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { deleteCartItem, fetchCartItems, updateCartQuantity } from "../../redux/shopSlice/cart/index.js";
import { useNavigate } from "react-router-dom";
import { Col, Row, Container, Button } from "react-bootstrap";

function Cart() {
	const { user } = useSelector((state) => state.auth);
	const { cartItems } = useSelector((state) => state.shopCart);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (user?.id) {
			dispatch(fetchCartItems(user.id));
		}
	}, [dispatch, user]);

	const handleQuantityChange = (e, productId) => {
		const newQuantity = parseInt(e.target.value, 10);
		if (newQuantity >= 1) {
			dispatch(
				updateCartQuantity({
					userId: user?.id,
					productId: productId,
					quantity: newQuantity,
				})
			);
		} else {
			dispatch(
				updateCartQuantity({
					userId: user?.id,
					productId: productId,
					quantity: 1,
				})
			);
		}
	};

	const handleDeleteItem = (productId) => {
		dispatch(
			deleteCartItem({
				userId: user?.id,
				productId: productId,
			})
		);
	};

	const totalSum = cartItems?.items?.reduce(
		(acc, item) => acc + item.price * item.quantity,
		0
	);

	const handlePlaceOrder = () => {
		navigate('/shop/order/new');
	};

	return (
		<Container>
			<Row>
				<h1>Your Cart</h1>
			</Row>
			<Row style={{ marginTop: "20px" }}>
				<div>
					{cartItems?.items?.length > 0 ? (
						<>
							{cartItems.items.map((item, index) => (
								<Row key={index} className="align-items-center mb-4" style={styles.productContainer}>
									<Col md={2}>
										<img
											src={item.image}
											alt={item.title}
											style={{
												width: "150px", // Increased width
												height: "150px", // Increased height
												objectFit: "contain", // Adjusted to contain
											}}
										/>
									</Col>
									<Col md={7}>
										<h2>{item.title}</h2>
										<p>Price: ${item.price}</p>
										<p>Total price: ${(item.price * item.quantity).toFixed(2)}</p>
									</Col>
									<Col md={2} style={styles.rightAligned}>
										<Row>
											<Col md = {4} style = {{marginLeft: "20px"}}>
												<p>Quantity: </p>
											</Col>
											<Col>
												<input
													id={`quantity-${index}`}
													type="number"
													min="1"
													value={item.quantity}
													onChange={(e) => handleQuantityChange(e, item.productId)}
													style={{marginLeft: "8px", width: "60px"}}
												/>
											</Col>
										</Row>
										<Row style={{alignContent: "center"}}>
											<Button
												variant="danger"
												onClick={() => handleDeleteItem(item.productId)}
											>
												Remove
											</Button>
										</Row>
									</Col>
								</Row>
							))}
							<Row className="mt-4">
								<Col>
									<h3>Total Sum: ${totalSum.toFixed(2)}</h3>
								</Col>
							</Row>
							<Row className="mt-4">
								<Col>
									<Button
										variant="success"
										onClick={handlePlaceOrder}
									>
										Place Order
									</Button>
								</Col>
							</Row>
						</>
					) : (
						<p>Your cart is empty.</p>
					)}
				</div>
			</Row>
		</Container>
	);
}

export default Cart;

const styles = {
	productContainer: {
		border: "2px solid black",
		borderRadius: "10px",
		padding: "10px",
		width: "100%",
		height: "220px", // Increased height for larger images
		display: "flex",
		alignItems: "center",
	},
	rightAligned: {
		marginRight: "20px",
	},
};