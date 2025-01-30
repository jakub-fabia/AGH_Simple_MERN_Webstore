import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getOrderDetails } from "../../redux/shopSlice/order/index.js";
import { Container, Row, Col, Card } from "react-bootstrap";

function OrderDetails() {
	const { id } = useParams();
	const { orderDetails } = useSelector((state) => state.shopOrder);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getOrderDetails(id));
	}, [dispatch, id]);

	if (!orderDetails) {
		return <div>Loading order details...</div>;
	}

	const { name, phone, address, items, orderStatus, createdAt } = orderDetails;

	return (
		<Container>
			<h1 className="my-4 text-center">Order Details</h1>

			<Card className="mb-4">
				<Card.Body>
					<Card.Title>Customer Information</Card.Title>
					<Card.Text><strong>Name:</strong> {name}</Card.Text>
					<Card.Text><strong>Phone:</strong> {phone}</Card.Text>
				</Card.Body>
			</Card>

			<Card className="mb-4">
				<Card.Body>
					<Card.Title>Shipping Address</Card.Title>
					<Card.Text>
						{address.street} {address.house},<br />
						{address.city}, {address.zipcode},<br />
						{address.country}
					</Card.Text>
				</Card.Body>
			</Card>

			<Card className="mb-4">
				<Card.Body>
					<Card.Title>Order Information</Card.Title>
					<Card.Text><strong>Order Status:</strong> {orderStatus}</Card.Text>
					<Card.Text><strong>Order Date:</strong> {new Date(createdAt).toLocaleString()}</Card.Text>
				</Card.Body>
			</Card>

			<Card className="mb-4">
				<Card.Body>
					<Card.Title>Order Items</Card.Title>
					{items.map((item) => (
						<Row key={item._id} className="mb-3">
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
					<h4>Total: ${items.reduce((acc, item) => acc + item.productId.price * item.quantity, 0).toFixed(2)}</h4>
				</Card.Body>
			</Card>
		</Container>
	);
}

export default OrderDetails;