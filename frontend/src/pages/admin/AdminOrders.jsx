import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {getAllOrdersForAdmin, updateOrderStatus} from "../../redux/adminSlice/orders/index.js";

function AdminOrders() {
	const dispatch = useDispatch();
	const { orderList, isLoading } = useSelector((state) => state.adminOrders);
	const [orderStatus, setOrderStatus] = useState({});

	useEffect(() => {
		dispatch(getAllOrdersForAdmin());
	}, [dispatch]);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	const handleStatusChange = (orderId, newStatus) => {
		setOrderStatus({ ...orderStatus, [orderId]: newStatus });
	};

	console.log(orderList)

	const handleConfirmClick = (orderId) => {
		const selectedStatus = orderStatus[orderId];
		dispatch(updateOrderStatus({
			id: orderId,
			orderStatus: selectedStatus,
		})).then(() => {dispatch(getAllOrdersForAdmin());})
	};

	return (
		<div className="p-4">
			{orderList.map((order) => {
				const orderTotal = order.items.reduce((sum, item) => sum + (item.quantity * item.productId.price), 0);
				return (
					<div key={order._id} className="mb-4 p-2 border rounded">
						<p className="font-bold">Order: {order._id} - Status: {order.orderStatus}</p>
						<p><strong>Name:</strong> {order.name}</p>
						<p><strong>Phone:</strong> {order.phone}</p>
						<p><strong>Address:</strong> {`${order.address.street} ${order.address.house}, ${order.address.city}, ${order.address.country}, ${order.address.zipcode}`}</p>
						<p><strong>Created At:</strong> {new Date(order.createdAt).toLocaleString()}</p>
						<p><strong>Updated At:</strong> {new Date(order.updatedAt).toLocaleString()}</p>
						<p><strong>Items:</strong></p>
						<ul className="list-disc pl-5">
							{order.items.map((item) => {
								const { title, price, image } = item.productId;
								const totalPrice = item.quantity * price;
								return (
									<li key={item._id} className="flex items-center space-x-4">
										<img src={image} alt={title} style={{width:'50px', height:'50px'}} />
										<div>
											<strong>{title}</strong>
											<p>Price: ${price} x {item.quantity} = <strong>${totalPrice.toFixed(2)}</strong></p>
										</div>
									</li>
								);
							})}
						</ul>
						<p className="font-bold mt-2">Order Total: ${orderTotal.toFixed(2)}</p>
						<div className="mt-4">
							<label className="mr-2 font-bold">Change Order Status:</label>
							<select
								value={orderStatus[order._id] || order.orderStatus}
								onChange={(e) => handleStatusChange(order._id, e.target.value)}
								className="border p-1 rounded"
							>
								{["New", "Paid", "Sent", "Delivered"].map((status) => (
									<option key={status} value={status}>{status}</option>
								))}
							</select>
							<button
								className="ml-2 border p-1 rounded"
								onClick={() => handleConfirmClick(order._id)}
							>
								Confirm
							</button>
						</div>
					</div>
				);
			})}
		</div>
	);
}

export default AdminOrders;
