import {Link, Outlet} from "react-router-dom";
import {logoutUser} from "../../redux/authSlice/index.js";
import {useDispatch} from "react-redux";

function ShopLayout() {
	const dispatch = useDispatch();
	function handleLogout() {
		dispatch(logoutUser());
	}
	return (
		<div>
			<h1>Shop Layout</h1>
			<Link to="/shop/home">
				<span>Home</span>
			</Link>
			<Link to="/shop/cart">
				<span>Cart</span>
			</Link>
			<Link to="/shop/orders">
				<span>Orders</span>
			</Link>
			<button onClick={handleLogout}>Logout</button>
			<div><Outlet/></div>
		</div>)
}

export default ShopLayout