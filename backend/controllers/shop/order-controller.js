const Order = require("../../models/order");
const Cart = require("../../models/cart");
const Product = require("../../models/product");

const createOrder = async (req, res) => {
	try {
		const {userId} = req.body;
		const userCart = Cart.find({userId})
		if(!userCart) {
			return res.status(404).json({
				success: false,
				message: "Cart can not be found",
			});
		}
		const newlyCreatedOrder = new Order({
			userId,
			userCart.items,
		});

		await newlyCreatedOrder.save();

		const approvalURL = paymentInfo.links.find(
			(link) => link.rel === "approval_url"
		).href;

		res.status(201).json({
			success: true,
			approvalURL,
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
		const { paymentId, payerId, orderId } = req.body;

		let order = await Order.findById(orderId);

		if (!order) {
			return res.status(404).json({
				success: false,
				message: "Order can not be found",
			});
		}

		order.paymentStatus = "paid";
		order.orderStatus = "confirmed";
		order.paymentId = paymentId;
		order.payerId = payerId;

		for (let item of order.cartItems) {
			let product = await Product.findById(item.productId);

			if (!product) {
				return res.status(404).json({
					success: false,
					message: `Not enough stock for this product ${product.title}`,
				});
			}

			product.totalStock -= item.quantity;

			await product.save();
		}

		const getCartId = order.cartId;
		await Cart.findByIdAndDelete(getCartId);

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