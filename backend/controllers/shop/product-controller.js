const Product = require("../../models/product");

const getProductDetails = async (req, res) => {
	try {
		const { id } = req.params;
		const product = await Product.findById(id);

		if (!product)
			return res.status(404).json({
				success: false,
				message: "Product not found!",
			});

		res.status(200).json({
			success: true,
			data: product,
		});
	} catch (e) {
		console.log(error);
		res.status(500).json({
			success: false,
			message: "Some error occurred",
		});
	}
};

const fetchAllProducts = async (req, res) => {
	try {
		const listOfProducts = await Product.find({});
		res.status(200).json({
			success: true,
			data: listOfProducts,
		});
	} catch (e) {
		console.log(e);
		res.status(500).json({
			success: false,
			message: "Error occurred",
		});
	}
};

module.exports = { getProductDetails, fetchAllProducts };