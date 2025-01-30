import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchAllProducts } from "../../redux/shopSlice/products/index.js";
import ShopProductTile from "../../components/shop/ShopProductTile.jsx";
import { Container, Row, Col} from "react-bootstrap";

const categories = ["All", "Men", "Women", "Kids", "Accessories", "Footwear"];

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
			<nav className="w-full mb-6">
				<div className="bg-gray-200 p-3 rounded-lg shadow-lg w-full">
					<div className="grid grid-cols-6 gap-4">
						{categories.map((category) => (
							<button
								style={{
									...styles.button,
									backgroundColor: selectedCategory === category ? 'black' : 'white',
									color: selectedCategory === category ? 'white' : 'black',
								}}
								key={category}
								onClick={() => setSelectedCategory(category)}
							>
								{category}
							</button>
						))}
					</div>
				</div>
			</nav>

			<br></br>

			<div className="flex justify-center mb-6">
				<input
					style={{backgroundColor: 'white'}}
					type="text"
					placeholder="Search products..."
					className="p-2 border rounded-md w-full max-w-md"
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
				/>
			</div>

			<Container>
				<h1 className="my-4 text-center">Shop Products</h1>
				<br></br>
				<Row className="d-flex justify-content-start">
					{filteredProducts && filteredProducts.length > 0 ? (
						filteredProducts.map((product) => (
							<Col key={product._id} sm={12} md={6} lg={4} className="mb-4">
								<ShopProductTile product={product} />
							</Col>
						))
					) : (
						<p className="text-center w-100">No products found.</p>
					)}
				</Row>
			</Container>
		</div>
	);
}

export default ShopHome;

const styles = {
	button : {
		backgroundColor: 'white',
		width: '15%',
		color: 'black',
		borderRadius: '5px',
		padding: '5px 10px',
		cursor: 'pointer',
		gap: '10px',
		marginLeft: '10px',
		marginRight: '10px'
	}
}
