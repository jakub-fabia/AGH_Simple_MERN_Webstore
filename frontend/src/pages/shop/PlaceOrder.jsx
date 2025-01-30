import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartItems } from "../../redux/shopSlice/cart/index.js";
import { createNewOrder } from "../../redux/shopSlice/order/index.js";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Form } from "react-bootstrap";

function PlaceOrder() {
	const [formData, setFormData] = useState({
		name: "",
		address: {
			country: "",
			city: "",
			zipcode: "",
			street: "",
			house: "",
		},
		phone: "",
	});
	const { user } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (user?.id) {
			dispatch(fetchCartItems(user.id));
		}
	}, [dispatch, user]);

	const handleChange = (e) => {
		const { name, value } = e.target;

		if (name in formData.address) {
			setFormData((prevData) => ({
				...prevData,
				address: {
					...prevData.address,
					[name]: value,
				},
			}));
		} else {
			setFormData((prevData) => ({
				...prevData,
				[name]: value,
			}));
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const orderData = {
			userId: user?.id,
			formData: formData,
		};
		const response = await dispatch(createNewOrder(orderData)).unwrap();
		if (response?.orderId) {
			navigate(`/shop/order/payment/${response.orderId}`);
		}
	}

	return (
		<Container className="p-4 max-w-md mx-auto">
			<h1 className="text-xl font-bold mb-4">Address Form</h1>
			<Form onSubmit={handleSubmit} className="space-y-4">
				<Row>
					<Col md={6}>
						<Form.Group>
							<Form.Label>Name</Form.Label>
							<Form.Control
								type="text"
								name="name"
								value={formData.name}
								onChange={handleChange}
								required
							/>
						</Form.Group>
					</Col>
					<Col md={6}>
						<Form.Group>
							<Form.Label>Country</Form.Label>
							<Form.Control
								type="text"
								name="country"
								value={formData.address.country}
								onChange={handleChange}
								required
							/>
						</Form.Group>
					</Col>
				</Row>
				<Row>
					<Col md={6}>
						<Form.Group>
							<Form.Label>City</Form.Label>
							<Form.Control
								type="text"
								name="city"
								value={formData.address.city}
								onChange={handleChange}
								required
							/>
						</Form.Group>
					</Col>
					<Col md={6}>
						<Form.Group>
							<Form.Label>Zipcode</Form.Label>
							<Form.Control
								type="text"
								name="zipcode"
								value={formData.address.zipcode}
								onChange={handleChange}
								required
							/>
						</Form.Group>
					</Col>
				</Row>
				<Row>
					<Col md={6}>
						<Form.Group>
							<Form.Label>Street</Form.Label>
							<Form.Control
								type="text"
								name="street"
								value={formData.address.street}
								onChange={handleChange}
								required
							/>
						</Form.Group>
					</Col>
					<Col md={6}>
						<Form.Group>
							<Form.Label>House</Form.Label>
							<Form.Control
								type="text"
								name="house"
								value={formData.address.house}
								onChange={handleChange}
								required
							/>
						</Form.Group>
					</Col>
				</Row>
				<Row>
					<Col md={6}>
						<Form.Group>
							<Form.Label>Phone</Form.Label>
							<Form.Control
								type="number"
								name="phone"
								value={formData.phone}
								onChange={handleChange}
								required
							/>
						</Form.Group>
					</Col>
				</Row>
				<br></br>
				<Button
					type="submit"
					variant="success"
					style={{ width: "30%", marginLeft: "35%" }}>
					Submit
				</Button>
			</Form>
		</Container>
	);
}

export default PlaceOrder;