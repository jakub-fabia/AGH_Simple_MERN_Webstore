import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllOrdersByUserId } from "../../redux/shopSlice/order/index.js";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

function UserOrders() {
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.auth);
	const { orderList } = useSelector((state) => state.shopOrder);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchOrders = async () => {
			if (!user?.id) return; // Ensure user is available before fetching

			try {
				console.log(user);
				setLoading(true);
				const response = await dispatch(getAllOrdersByUserId(user.id)).unwrap();
				console.log("Orders fetched:", response);
			} catch (error) {
				console.error("Error fetching orders:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchOrders();
	}, [dispatch, user]);

	if (loading) {
		return <div>Loading user orders...</div>;
	}

	return (
		<Container>
			<h1 className="my-4 text-center">Your Orders</h1>
			{orderList && orderList.length > 0 ? (
				<Row>
					{orderList.map((order) => (
						<Col key={order._id} sm={12} md={6} lg={4} className="mb-4">
							<Card>
								<Card.Body>
									<Card.Title>Order #{order._id}</Card.Title>
									<Card.Text>Status: {order.orderStatus}</Card.Text>
									<Link to={`/shop/order/details/${order._id}`}>
										<Button variant="dark">View Details</Button>
									</Link>
								</Card.Body>
							</Card>
						</Col>
					))}
				</Row>
			) : (
				<p className="text-center">No orders found.</p>
			)}
		</Container>
	);
}

export default UserOrders;