import { useState } from "react";
import {useDispatch} from "react-redux";
import {addNewProduct} from "../../redux/adminSlice/products/index.js";

const initialFormData = {
	image: "",
	title: "",
	description: "",
	category: "",
	price: "",
	stock: "",
	averageReview: 0,
};

function AdminAddProduct() {
	const [formData, setFormData] = useState(initialFormData);
	const dispatch = useDispatch();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const isUnchanged = Object.entries(initialFormData).every(
			([key, value]) => formData[key] === value
		);

		if (isUnchanged) {
			alert("Please modify all fields before submitting.");
			return;
		}

		dispatch(addNewProduct(formData)).then((data) => {
			if (data?.payload?.success) {
				alert("Product Added Successfully");
				setFormData(initialFormData);
			}
		});
	};

	return (
		<div className="p-4">
			<h1 className="text-xl font-bold mb-4">Add/Edit Product</h1>
			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<label className="block font-medium mb-1">Image URL</label>
					<input
						type="text"
						name="image"
						value={formData.image}
						onChange={handleChange}
						className="block w-full border rounded p-2"
						placeholder="Enter image URL"
					/>
				</div>
				<div>
					<label className="block font-medium mb-1">Title</label>
					<input
						type="text"
						name="title"
						value={formData.title}
						onChange={handleChange}
						className="block w-full border rounded p-2"
						placeholder="Enter product title"
					/>
				</div>
				<div>
					<label className="block font-medium mb-1">Description</label>
					<textarea
						name="description"
						value={formData.description}
						onChange={handleChange}
						className="block w-full border rounded p-2"
						placeholder="Enter product description"
					></textarea>
				</div>
				<div>
					<label className="block font-medium mb-1">Category</label>
					<select
						name="category"
						value={formData.category}
						onChange={handleChange}
						className="block w-full border rounded p-2"
					>
						<option value="">Select category</option>
						<option value="Men">Men</option>
						<option value="Women">Women</option>
						<option value="Kids">Kids</option>
						<option value="Accessories">Accessories</option>
						<option value="Footwear">Footwear</option>
					</select>
				</div>
				<div>
					<label className="block font-medium mb-1">Price</label>
					<input
						type="number"
						name="price"
						value={formData.price}
						onChange={handleChange}
						className="block w-full border rounded p-2"
						placeholder="Enter product price"
					/>
				</div>
				<div>
					<label className="block font-medium mb-1">Stock</label>
					<input
						type="number"
						name="stock"
						value={formData.stock}
						onChange={handleChange}
						className="block w-full border rounded p-2"
						placeholder="Enter stock quantity"
					/>
				</div>
				<button
					type="submit"
					className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600"
				>
					Submit
				</button>
			</form>
		</div>
	);
}

export default AdminAddProduct;