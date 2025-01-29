const Order = require("../../models/order");
const Cart = require("../../models/cart");
const Product = require("../../models/product");
const User = require("../../models/user");

const createOrder = async (req, res) => {
	try {
		const {userId, formData} = req.body;
		const userCart = await Cart.findOne({user: userId})
		const userCartItems = userCart.items;
		if(!userCart) {
			return res.status(404).json({
				success: false,
				message: "Cart can not be found",
			});
		}

		const newlyCreatedOrder = new Order({
			user: userId,
			items: userCartItems,
			name: formData.name,
			address: formData.address,
			phone: formData.phone
		});

		await newlyCreatedOrder.save();

		res.status(201).json({
			success: true,
			orderId: newlyCreatedOrder._id,
		});
	} catch (e) {
		console.log(e);
		res.status(500).json({
			success: false,
			message: "Some error occured!",
		});
	}
};

const capturePayment = async (req, res) => {
	try {
		const { orderId, userId } = req.body;

		let order = await Order.findById(orderId);

		if (!order) {
			return res.status(404).json({
				success: false,
				message: "Order can not be found",
			});
		}

		order.orderStatus = "Paid";

		for (let item of order.items) {
			let product = await Product.findById(item.productId);

			if (!product) {
				return res.status(404).json({
					success: false,
					message: `Not enough stock for this product ${product.title}`,
				});
			}
			console.log(product)
			console.log(item.quantity)
			product.stock -= item.quantity;

			await product.save();
		}

		await Cart.findOneAndDelete({user: userId});

		await order.save();

		res.status(200).json({
			success: true,
			message: "Order confirmed",
			data: order,
		});
	} catch (e) {
		console.log(e);
		res.status(500).json({
			success: false,
			message: "Some error occured!",
		});
	}
};

const getAllOrdersByUser = async (req, res) => {
	try {
		const { userId } = req.params;

		const orders = await Order.find({ userId });

		if (!orders.length) {
			return res.status(404).json({
				success: false,
				message: "No orders found!",
			});
		}

		res.status(200).json({
			success: true,
			data: orders,
		});
	} catch (e) {
		console.log(e);
		res.status(500).json({
			success: false,
			message: "Some error occured!",
		});
	}
};

const getOrderDetails = async (req, res) => {
	try {
		const { id } = req.params;

		const order = await Order.findById(id);
		if (!order) {
			return res.status(404).json({
				success: false,
				message: "Order not found!",
			});
		}

		res.status(200).json({
			success: true,
			data: order,
		});
	} catch (e) {
		console.log(e);
		res.status(500).json({
			success: false,
			message: "Some error occured!",
		});
	}
};

module.exports = {
	createOrder,
	capturePayment,
	getAllOrdersByUser,
	getOrderDetails,
};