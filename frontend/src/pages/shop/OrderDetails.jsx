import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getOrderDetails } from "../../redux/shopSlice/order/index.js";

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
		<div style={{ padding: "20px" }}>
			<h1>Order Details</h1>
			<div style={{ marginBottom: "20px" }}>
				<h2>Customer Information</h2>
				<p><strong>Name:</strong> {name}</p>
				<p><strong>Phone:</strong> {phone}</p>
			</div>
			<div style={{ marginBottom: "20px" }}>
				<h2>Shipping Address</h2>
				<p>
					{address.street} {address.house},<br />
					{address.city}, {address.zipcode},<br />
					{address.country}
				</p>
			</div>
			<div style={{ marginBottom: "20px" }}>
				<h2>Order Information</h2>
				<p><strong>Order Status:</strong> {orderStatus}</p>
				<p><strong>Order Date:</strong> {new Date(createdAt).toLocaleString()}</p>
			</div>
			<div>
				<h2>Order Items</h2>
				{items.map((item) => (
					<div
						key={item._id}
						style={{
							display: "flex",
							alignItems: "center",
							marginBottom: "16px",
							borderBottom: "1px solid #ccc",
							paddingBottom: "10px",
						}}
					>
						<img
							src={item.productId.image}
							alt={item.productId.title}
							style={{
								width: "100px",
								height: "100px",
								marginRight: "16px",
								objectFit: "cover",
								borderRadius: "5px",
							}}
						/>
						<div style={{ flex: 1 }}>
							<h3 style={{ margin: "0" }}>{item.productId.title}</h3>
							<p style={{ margin: "0" }}>Price: ${item.productId.price.toFixed(2)}</p>
							<p style={{ margin: "0" }}>Quantity: {item.quantity}</p>
							<p style={{ margin: "0" }}>
								Total: ${(item.productId.price * item.quantity).toFixed(2)}
							</p>
						</div>
					</div>
				))}
			</div>
			<div
				style={{
					marginTop: "20px",
					fontSize: "18px",
					fontWeight: "bold",
					textAlign: "right",
				}}
			>
				Total: ${items
				.reduce((acc, item) => acc + item.productId.price * item.quantity, 0)
				.toFixed(2)}
			</div>
		</div>
	);
}

export default OrderDetails;
