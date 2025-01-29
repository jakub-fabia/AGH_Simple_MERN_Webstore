import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/authSlice/index.js";
import NavbarAdmin from "../navbar/NavbarAdmin.jsx";

function AdminLayout() {
	const dispatch = useDispatch();

	function handleLogout() {
		dispatch(logoutUser());
	}

	return (
		<div>
			<NavbarAdmin />
			<div style={styles.content}>
				<Outlet />
			</div>
		</div>
	);
}

const styles = {
	content: {
		padding: "20px",
	},
};

export default AdminLayout;
