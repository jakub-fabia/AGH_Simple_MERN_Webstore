import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllOrdersByUserId } from "../../redux/shopSlice/order/index.js";
import {Link} from "react-router-dom";

function UserOrders() {
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.auth);
	const { orderList } = useSelector((state) => state.shopOrder);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchOrders = async () => {
			if (!user?.id) return; // Ensure user is available before fetching

			try {
				console.log(user)
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
		<div>
			<h1>Your Orders</h1>
			{orderList && orderList.length > 0 ? (
				<ul>
					{orderList.map((order) => (
						<Link to={`/shop/order/details/${order._id}`} key={order._id}>
							<li>
								Order #{order._id} - Status: {order.orderStatus}
							</li>
						</Link>
					))}
				</ul>
			) : (
				<p>No orders found.</p>
			)}
		</div>
	);
}

export default UserOrders;
