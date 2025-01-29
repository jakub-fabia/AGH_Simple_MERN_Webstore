import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchAllProducts } from "../../redux/shopSlice/products/index.js";
import { Link } from "react-router-dom";

const categories = ["All", "Men", "Women", "Kids", "Accessories", "Footwear", "Home"];

function ShopHome() {
	const { productList } = useSelector((state) => state.shopProducts);
	const dispatch = useDispatch();
	const [selectedCategory, setSelectedCategory] = useState("All");
	const [searchQuery, setSearchQuery] = useState("");

	useEffect(() => {
		dispatch(fetchAllProducts());
	}, [dispatch]);

	const filteredProducts = productList.filter((product) =>
		(selectedCategory === "All" || product.category === selectedCategory) &&
		product.title.toLowerCase().includes(searchQuery.toLowerCase())
	);

	return (
		<div>
			{/* Category Filter Navbar */}
			<nav className="flex justify-center space-x-4 bg-gray-200 p-4 rounded-md mb-6">
				{categories.map((category) => (
					<button
						key={category}
						className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
							selectedCategory === category
								? "bg-green-600 text-white"
								: "bg-white text-gray-700 hover:bg-gray-300"
						}`}
						onClick={() => setSelectedCategory(category)}
					>
						{category}
					</button>
				))}
			</nav>

			{/* Search Bar */}
			<div className="flex justify-center mb-6">
				<input
					type="text"
					placeholder="Search products..."
					className="p-2 border rounded-md w-full max-w-md"
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
				/>
			</div>

			{/* Product Grid */}
			<div className="grid grid-cols-1 sm:grid-cols-2 md-grid-cols-3 gap-6 p-4">
				{filteredProducts && filteredProducts.length > 0 ? (
					filteredProducts.map((product) => (
						<Link to={`/shop/product/${product._id}`} key={product._id}>
							<div className="border rounded-lg shadow-md p-4 flex flex-col items-center">
								<img
									src={product.image}
									alt={product.title}
									className="w-full h-48 object-cover mb-4 rounded-md"
								/>
								<h2 className="text-lg font-semibold mb-2">{product.title}</h2>
								<p className="text-sm text-gray-600 mb-2">{product.description}</p>
								<p className="text-lg font-bold text-green-600">${product.price}</p>
								<p className="text-sm text-gray-500">In Stock: {product.stock}</p>
							</div>
						</Link>
					))
				) : (
					<p className="text-center col-span-full">No products found.</p>
				)}
			</div>
		</div>
	);
}

export default ShopHome;
