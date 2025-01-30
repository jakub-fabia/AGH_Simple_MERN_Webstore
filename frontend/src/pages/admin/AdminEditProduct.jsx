import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editProduct, fetchAllProducts, fetchProduct } from "../../redux/adminSlice/products";
import { useNavigate, useParams } from "react-router-dom";
import AdminProductTile from "../../components/admin/AdminProductTile.jsx";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";

function AdminEditProduct() {
	const { id } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { product, loading, error } = useSelector((state) => state.adminProducts);
	const [formData, setFormData] = useState(null);

	useEffect(() => {
		dispatch(fetchProduct(id));
	}, [dispatch, id]);

	useEffect(() => {
		if (product && Object.keys(product).length > 0) {
			setFormData({
				image: product.image || "",
				title: product.title || "",
				description: product.description || "",
				price: product.price || 0,
				stock: product.stock || 0,
				category: product.category || ""
			});
		}
	}, [product]);

	if (loading) return <div>Loading...</div>;
	if (error) return <div className="text-danger">Error: {error}</div>;
	if (!formData) return <div>Loading product data...</div>;

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: name === "price" || name === "stock" ? parseFloat(value) || 0 : value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await dispatch(editProduct({ id: product?._id, formData }));
			if (response?.payload?.success) {
				alert("Product updated successfully");
				navigate("/admin/products/all");
			}
		} catch (error) {
			alert("Error updating product");
		}
		dispatch(fetchAllProducts());
	};

	return (
		<Container className="py-5">
			<Row className="justify-content-center">
				<Col md={5}>
					<h2 className="text-center mb-3">Edit Product</h2>
					<Card className="p-4 shadow bg-light rounded">
						<Form onSubmit={handleSubmit}>
							{["image", "title", "description", "price", "stock"].map((field) => (
								<Form.Group className="mb-3" key={field}>
									<Form.Label>{field.charAt(0).toUpperCase() + field.slice(1)}</Form.Label>
									<Form.Control
										type={field === "description" ? "textarea" : "text"}
										as={field === "description" ? "textarea" : "input"}
										name={field}
										value={formData[field]}
										onChange={handleChange}
										placeholder={`Enter ${field}`}
									/>
								</Form.Group>
							))}
							<Form.Group className="mb-3">
								<Form.Label>Category</Form.Label>
								<Form.Select name="category" value={formData.category} onChange={handleChange}>
									<option value="">Select category</option>
									{["Men", "Women", "Kids", "Accessories", "Footwear"].map((cat) => (
										<option key={cat} value={cat}>{cat}</option>
									))}
								</Form.Select>
							</Form.Group>
							<Button variant="dark" type="submit" className="w-100">Submit</Button>
						</Form>
					</Card>
				</Col>
				<Col md={5}>
					<h2 className="text-center mb-3">Product Preview</h2>
					<Card className="p-4 shadow bg-light rounded">
						{formData && <AdminProductTile product={formData} handleEdit={() => {}} handleDelete={() => {}} />}
					</Card>
				</Col>
			</Row>
		</Container>
	);
}

export default AdminEditProduct;
