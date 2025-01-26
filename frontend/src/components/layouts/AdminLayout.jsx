import {Outlet} from "react-router-dom";

function AdminLayout() {
	return (
		<div>
			<h1>Admin Layout</h1>
			<div><Outlet/></div>
		</div>)
}

export default AdminLayout;