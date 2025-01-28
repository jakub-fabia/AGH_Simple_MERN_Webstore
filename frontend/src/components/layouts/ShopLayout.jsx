import {Outlet} from "react-router-dom";
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
			<button onClick={handleLogout}>Logout</button>
			<div><Outlet/></div>
		</div>)
}

export default ShopLayout