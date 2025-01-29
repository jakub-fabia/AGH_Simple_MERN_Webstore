import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import cart, { deleteCartItem, fetchCartItems, updateCartQuantity } from "../../redux/shopSlice/cart/index.js";
import {useNavigate} from "react-router-dom";

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
		navigate('/shop/order/new')
	}

	return (
		<div>
			<h1>Your Cart</h1>
			<div>
				{cartItems?.items?.length > 0 ? (
					<>
						{cartItems.items.map((item, index) => (
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
									src={item.image}
									alt={item.title}
									style={{
										width: "100px",
										height: "100px",
										marginRight: "16px",
										objectFit: "cover",
									}}
								/>
								{/* Product Info */}
								<div style={{flex: 1}}>
									<h2 style={{margin: "0"}}>{item.title}</h2>
									<p style={{margin: "0"}}>Price: ${item.price}</p>
									<p style={{margin: "0"}}>
										Total price: ${(item.price * item.quantity)}
									</p>
								</div>
								{/* Quantity Input */}
								<div>
									<label htmlFor={`quantity-${index}`}>Quantity:</label>
									<input
										id={`quantity-${index}`}
										type="number"
										min="1"
										value={item.quantity}
										onChange={(e) => handleQuantityChange(e, item.productId)}
										style={{marginLeft: "8px", width: "60px"}}
									/>
								</div>
								{/* Remove Button */}
								<div>
									<button
										style={{
											marginLeft: "16px",
											backgroundColor: "red",
											color: "white",
											border: "none",
											padding: "8px 12px",
											cursor: "pointer",
										}}
										onClick={() => handleDeleteItem(item.productId)}
									>
										Remove
									</button>
								</div>
							</div>
						))}
						{/* Total Sum */}
						<div
							style={{
								marginTop: "20px",
								fontSize: "18px",
								fontWeight: "bold",
							}}
						>
							Total Sum: ${totalSum}
						</div>
						{/* Place Order Button */}
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
							onClick={handlePlaceOrder}
						>
							Place Order
						</button>
					</>
				) : (
					<p>Your cart is empty.</p>
				)}
			</div>
		</div>
	);
}

export default Cart;
