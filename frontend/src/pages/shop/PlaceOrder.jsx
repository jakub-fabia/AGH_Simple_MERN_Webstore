import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchCartItems} from "../../redux/shopSlice/cart/index.js";
import {createNewOrder} from "../../redux/shopSlice/order/index.js";
import {useNavigate} from "react-router-dom";

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
		<div className="p-4 max-w-md mx-auto">
			<h1 className="text-xl font-bold mb-4">Address Form</h1>
			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<label className="block font-medium">Name</label>
					<input
						type="text"
						name="name"
						value={formData.name}
						onChange={handleChange}
						className="border rounded p-2 w-full"
						required
					/>
				</div>

				<div>
					<label className="block font-medium">Country</label>
					<input
						type="text"
						name="country"
						value={formData.address.country}
						onChange={handleChange}
						className="border rounded p-2 w-full"
						required
					/>
				</div>

				<div>
					<label className="block font-medium">City</label>
					<input
						type="text"
						name="city"
						value={formData.address.city}
						onChange={handleChange}
						className="border rounded p-2 w-full"
						required
					/>
				</div>

				<div>
					<label className="block font-medium">Zipcode</label>
					<input
						type="text"
						name="zipcode"
						value={formData.address.zipcode}
						onChange={handleChange}
						className="border rounded p-2 w-full"
						required
					/>
				</div>

				<div>
					<label className="block font-medium">Street</label>
					<input
						type="text"
						name="street"
						value={formData.address.street}
						onChange={handleChange}
						className="border rounded p-2 w-full"
						required
					/>
				</div>

				<div>
					<label className="block font-medium">House</label>
					<input
						type="text"
						name="house"
						value={formData.address.house}
						onChange={handleChange}
						className="border rounded p-2 w-full"
						required
					/>
				</div>

				<div>
					<label className="block font-medium">Phone</label>
					<input
						type="number"
						name="phone"
						value={formData.phone}
						onChange={handleChange}
						className="border rounded p-2 w-full"
						required
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

export default PlaceOrder;
