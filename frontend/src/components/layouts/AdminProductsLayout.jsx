import {Link, Outlet} from "react-router-dom";


function AdminProductsLayout() {
	return (
		<div>
			<div>
				<Link to="/admin/products/all">
					<span>Lista</span><br/>
				</Link>
				<Link to="/admin/products/add">
					<span>Dodaj</span>
				</Link>
			</div>
			<div><Outlet /></div>
		</div>
	)
}

export default AdminProductsLayout;