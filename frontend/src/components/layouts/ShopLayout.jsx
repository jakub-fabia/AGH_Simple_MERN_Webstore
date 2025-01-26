import {Outlet} from "react-router-dom";

function ShopLayout() {
	return (
		<div>
			<h1>Shop Layout</h1>
			<div><Outlet/></div>
		</div>)
}

export default ShopLayout