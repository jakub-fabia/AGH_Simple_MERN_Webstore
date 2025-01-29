import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersForAdmin, updateOrderStatus } from "../../redux/adminSlice/orders/index.js";
import { motion } from "framer-motion";
import 'bootstrap/dist/css/bootstrap.min.css'

function AdminOrders() {
	const dispatch = useDispatch();
	const { orderList, isLoading } = useSelector((state) => state.adminOrders);
	const [expandedOrder, setExpandedOrder] = useState(null);
	const [orderStatus, setOrderStatus] = useState({});
	const [filterStatus, setFilterStatus] = useState("All");

	useEffect(() => {
		dispatch(getAllOrdersForAdmin());
	}, [dispatch]);

	if (isLoading) {
		return <div className="text-center text-lg font-bold mt-24">Loading...</div>;
	}

	const toggleExpand = (orderId) => {
		setExpandedOrder(expandedOrder === orderId ? null : orderId);
	};

	const handleStatusChange = (orderId, newStatus) => {
		setOrderStatus({ ...orderStatus, [orderId]: newStatus });
	};

	const handleConfirmClick = (orderId) => {
		const selectedStatus = orderStatus[orderId];
		dispatch(updateOrderStatus({ id: orderId, orderStatus: selectedStatus }))
			.then(() => dispatch(getAllOrdersForAdmin()));
	};

	const filteredOrders = filterStatus === "All" ? orderList : orderList.filter(order => order.orderStatus === filterStatus);

	return (
		<div className="p-6 max-w-4xl mx-auto mt-24">
			<div className="mb-6 flex items-center bg-gray-100 p-3 rounded-lg shadow">
				<label className="mr-3 font-bold text-gray-700">Filter by Status:</label>
				<select
					value={filterStatus}
					onChange={(e) => setFilterStatus(e.target.value)}
					className="border p-2 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
				>
					<option value="All">All</option>
					<option value="New">New</option>
					<option value="Paid">Paid</option>
					<option value="Sent">Sent</option>
					<option value="Delivered">Delivered</option>
				</select>
			</div>
			{filteredOrders.map((order) => {
				const orderTotal = order.items.reduce((sum, item) => sum + (item.quantity * item.productId.price), 0);
				return (
					<div key={order._id} className="mb-4 border-2 border-black rounded-lg shadow-lg bg-white p-4 mx-2">
						<div className="cursor-pointer flex justify-between items-center" onClick={() => toggleExpand(order._id)}>
							<p className="font-bold text-lg">Order: {order._id}</p>
							<span className="text-gray-500">{order.orderStatus}</span>
						</div>
						{expandedOrder === order._id && (
							<motion.div
								initial={{ opacity: 0, height: 0 }}
								animate={{ opacity: 1, height: "auto" }}
								className="border-t bg-gray-50 mt-2 p-4"
							>
								<p><strong>Name:</strong> {order.name}</p>
								<p><strong>Phone:</strong> {order.phone}</p>
								<p><strong>Address:</strong> {`${order.address.street} ${order.address.house}, ${order.address.city}, ${order.address.country}, ${order.address.zipcode}`}</p>
								<p><strong>Created At:</strong> {new Date(order.createdAt).toLocaleString()}</p>
								<p><strong>Updated At:</strong> {new Date(order.updatedAt).toLocaleString()}</p>
								<p className="font-bold mt-2">Order Total: ${orderTotal.toFixed(2)}</p>
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
								<div className="mt-4 flex items-center">
									<label className="mr-2 font-bold">Change Order Status:</label>
									<select
										value={orderStatus[order._id] || order.orderStatus}
										onChange={(e) => handleStatusChange(order._id, e.target.value)}
										className="border p-1 rounded bg-white"
									>
										{["New", "Paid", "Sent", "Delivered"].map((status) => (
											<option key={status} value={status}>{status}</option>
										))}
									</select>
									<button
										className="ml-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
										onClick={() => handleConfirmClick(order._id)}
									>
										Confirm
									</button>
								</div>
							</motion.div>
						)}
					</div>
				);
			})}
		</div>
	);
}

export default AdminOrders;
