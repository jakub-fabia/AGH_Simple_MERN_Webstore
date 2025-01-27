import {Link, Outlet} from "react-router-dom";

function AdminLayout() {
	return (
		<div>
			<div>
				<Link to="/admin/products/all">
					<span>Products</span><br/>
				</Link>
				<Link to="/admin/dashboard">
					<span>Dashboard</span><br/>
				</Link>
			</div>
				<div><Outlet/></div>
		</div>
	)
}

export default AdminLayout;