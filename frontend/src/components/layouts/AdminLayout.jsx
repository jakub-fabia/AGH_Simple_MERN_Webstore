import {Link, Outlet} from "react-router-dom";
import {useDispatch} from "react-redux";
import {logoutUser} from "../../redux/authSlice/index.js";

function AdminLayout() {
	const dispatch = useDispatch();

	function handleLogout() {
		dispatch(logoutUser());
	}
	return (
		<div>
			<div>
				<Link to="/admin/products/all">
					<span>Products</span><br/>
				</Link>
				<Link to="/admin/dashboard">
					<span>Dashboard</span><br/>
				</Link>
				<button onClick={handleLogout}>Logout</button>
			</div>
				<div><Outlet/></div>
		</div>
	)
}

export default AdminLayout;