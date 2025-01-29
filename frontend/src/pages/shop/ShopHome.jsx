import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAllProducts } from "../../redux/shopSlice/products/index.js";
import {Link} from "react-router-dom";

function ShopHome() {
	const { productList } = useSelector((state) => state.shopProducts);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchAllProducts());
	}, [dispatch]);

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
			{productList && productList.length > 0 ? (
				productList.map((product) => (
					<Link to={`/shop/product/${product._id}`} key={product._id}>
						<div
							className="border rounded-lg shadow-md p-4 flex flex-col items-center"
						>
							<img
								src={product.image}
								alt={product.title}
								className="w-full h-48 object-cover mb-4 rounded-md"
							/>
							<h2 className="text-lg font-semibold mb-2">
								{product.title}
							</h2>
							<p className="text-sm text-gray-600 mb-2">
								{product.description}
							</p>
							<p className="text-lg font-bold text-green-600">
								${product.price}
							</p>
							<p className="text-sm text-gray-500">
								In Stock: {product.stock}
							</p>
						</div>
					</Link>
				))
			) : (
				<p className="text-center col-span-full">No products found.</p>
			)}
		</div>
	);
}

export default ShopHome;
