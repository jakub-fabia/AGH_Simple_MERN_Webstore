import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { capturePayment, getOrderDetails } from "../../redux/shopSlice/order/index.js";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

function PayForOrder() {
	const { id } = useParams();
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.auth);
	const navigate = useNavigate();
	const { orderDetails, isLoading } = useSelector((state) => state.shopOrder);

	useEffect(() => {
		const fetchOrderDetails = async () => {
			dispatch(getOrderDetails(id));
		};

		fetchOrderDetails();
	}, [dispatch, id, user?.id]);

	const totalSum = orderDetails?.items?.reduce(
		(acc, item) => acc + item.productId.price * item.quantity,
		0
	);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	const handlePay = async () => {
		try {
			const response = await dispatch(
				capturePayment({
					userId: user?.id,
					orderId: orderDetails?._id,
				})
			).unwrap();

			console.log("Payment successful:", response);

			navigate("/shop/home");
		} catch (error) {
			console.error("Payment failed:", error);
		}
	};

	return (
		<Container>
			<h1 className="my-4 text-center">Order Details</h1>

			<Card className="mb-4">
				<Card.Body>
					<Card.Title>Shipping Address</Card.Title>
					<Card.Text>
						{orderDetails?.name}
						<br />
						{orderDetails?.address.street} {orderDetails?.address.house},<br />
						{orderDetails?.address.city}, {orderDetails?.address.zipcode},<br />
						{orderDetails?.address.country}
					</Card.Text>
					<Card.Text>Phone: {orderDetails?.phone}</Card.Text>
				</Card.Body>
			</Card>

			<Card className="mb-4">
				<Card.Body>
					<Card.Title>Order Items</Card.Title>
					<br></br>
					{orderDetails?.items.map((item, index) => (
						<Row key={index} className="mb-3">
							<Col md={2}>
								<img
									src={item.productId.image}
									alt={item.productId.title}
									style={{
										width: "100%",
										height: "auto",
										objectFit: "cover",
										borderRadius: "5px",
									}}
								/>
							</Col>
							<Col md={10}>
								<h5>{item.productId.title}</h5>
								<p>Price: ${item.productId.price.toFixed(2)}</p>
								<p>Quantity: {item.quantity}</p>
								<p>Total: ${(item.productId.price * item.quantity).toFixed(2)}</p>
							</Col>
						</Row>
					))}
				</Card.Body>
			</Card>

			<Card className="mb-4">
				<Card.Body className="text-right">
					<h4>Total: ${totalSum.toFixed(2)}</h4>
				</Card.Body>
			</Card>

			<div className="text-center">
				<Button
					variant="success"
					style={{ width: "200px" }}
					onClick={handlePay}
				>
					Pay
				</Button>
			</div>
			<br></br>
		</Container>
	);
}

export default PayForOrder;