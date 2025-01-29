import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { capturePayment, getOrderDetails } from "../../redux/shopSlice/order/index.js";

function PayForOrder() {
	const { id } = useParams();
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.auth);
	const navigate = useNavigate();
	const { orderDetails, isLoading } = useSelector((state) => state.shopOrder);

	useEffect(() => {
		const fetchOrderDetails = async () => {
			dispatch(getOrderDetails(id))
		};

		fetchOrderDetails();
	}, [dispatch, id, user?.id]);


	const totalSum = orderDetails?.items?.reduce(
		(acc, item) => acc + item.productId.price * item.quantity,
		0
	);
	if (isLoading){
		return <div>Loading...</div>
	}else{
		console.log(orderDetails);
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
		<div>
			<h1>Order Details</h1>
			<div>
				<h2>Shipping Address</h2>
				<p>
					{orderDetails?.name}
					<br />
					{orderDetails?.address.street} {orderDetails?.address.house},<br />
					{orderDetails?.address.city}, {orderDetails?.address.zipcode},<br />
					{orderDetails?.address.country}
				</p>
				<p>Phone: {orderDetails?.phone}</p>
			</div>
			<div>
				<h2>Items</h2>
				{orderDetails?.items.map((item, index) => (
					<div
						key={index}
						style={{
							display: "flex",
							alignItems: "center",
							marginBottom: "16px",
						}}
					>
						{/* Product Image */}
						<img
							src={item.productId.image}
							alt={item.productId.title}
							style={{
								width: "100px",
								height: "100px",
								marginRight: "16px",
								objectFit: "cover",
							}}
						/>
						{/* Product Info */}
						<div style={{ flex: 1 }}>
							<h3 style={{ margin: "0" }}>{item.productId.title}</h3>
							<p style={{ margin: "0" }}>Price: ${item.productId.price}</p>
							<p style={{ margin: "0" }}>Quantity: {item.quantity}</p>
							<p style={{ margin: "0" }}>
								Total Price: ${(item.productId.price * item.quantity)}
							</p>
						</div>
					</div>
				))}
			</div>
			{/* Total Sum */}
			<div
				style={{
					marginTop: "20px",
					fontSize: "18px",
					fontWeight: "bold",
				}}
			>
				Total: ${totalSum}
			</div>
			{/* Pay Button */}
			<button
				style={{
					marginTop: "20px",
					padding: "10px 20px",
					fontSize: "16px",
					fontWeight: "bold",
					backgroundColor: "#28a745",
					color: "white",
					border: "none",
					borderRadius: "5px",
					cursor: "pointer",
				}}
				onClick={handlePay}
			>
				Pay
			</button>
		</div>
	);
}

export default PayForOrder;
