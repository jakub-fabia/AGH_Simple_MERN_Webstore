import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {deleteProduct, editProduct, fetchAllProducts} from "../../redux/adminSlice/products/index.js";
import AdminProductTile from "../../components/admin/AdminProductTile.jsx";
import {useNavigate} from "react-router-dom";


function AdminProducts(){
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { productList } = useSelector((state) => state.adminProducts);

	useEffect(() => {
		dispatch(fetchAllProducts());
	}, [dispatch]);

	function handleDelete(productID) {
		dispatch(deleteProduct(productID)).then((data) => {
			if (data?.payload?.success) {
				alert("Product deleted successfully");
				dispatch(fetchAllProducts());
			}
		});
	}

	function handleEdit(productID) {
		navigate(`/admin/products/edit/${productID}`);
	}

	return (
		<div>
			<div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
				{productList && productList.length > 0
					? productList.map((productItem) => (
						<AdminProductTile
							key = {productItem._id}
							product={productItem}
							handleEdit={handleEdit}
							handleDelete={handleDelete}
						/>
					))
					: null}
			</div>
		</div>
	)
}

export default AdminProducts;