import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getAllOrdersForAdmin} from "../../redux/adminSlice/orders/index.js";

function AdminOrders() {
	const dispatch = useDispatch();
	const orderList = useSelector((state) => state.adminOrders);
	useEffect(() => {
		dispatch(getAllOrdersForAdmin().then((data) => {
			if (data?.payload?.success) {
				alert("Product deleted successfully");
			}
	}))}, [dispatch]);
	return (
		<div>
			{/*Trzeba wymapować ordery jakoś ładnie z przyciskiem przechodzącym do podstrony z detalami i możliwością edycji statusu*/}
		</div>
	)
}

export default AdminOrders;