const Product = require("../../models/product.js");

const addProduct = async (req, res) => {
	try {
		const {
			image,
			title,
			description,
			category,
			price,
			stock,
			averageReview,
		} = req.body;

		console.log(averageReview, "averageReview");

		const newlyCreatedProduct = new Product({
			image,
			title,
			description,
			category,
			price,
			stock,
			averageReview,
		});

		await newlyCreatedProduct.save();
		res.status(201).json({
			success: true,
			data: newlyCreatedProduct,
		});
	} catch (e) {
		console.log(e);
		res.status(500).json({
			success: false,
			message: "Error occured",
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
			message: "Error occured",
		});
	}
};

const editProduct = async (req, res) => {
	try {
		const { id } = req.params;
		const {
			image,
			title,
			description,
			category,
			price,
			stock,
			averageReview,
		} = req.body;

		let findProduct = await Product.findById(id);
		if (!findProduct)
			return res.status(404).json({
				success: false,
				message: "Product not found",
			});

		findProduct.title = title || findProduct.title;
		findProduct.description = description || findProduct.description;
		findProduct.category = category || findProduct.category;
		findProduct.price = price === "" ? 0 : price || findProduct.price;
		findProduct.stock = stock || findProduct.stock;
		findProduct.image = image || findProduct.image;
		findProduct.averageReview = averageReview || findProduct.averageReview;

		await findProduct.save();
		res.status(200).json({
			success: true,
			data: findProduct,
		});
	} catch (e) {
		console.log(e);
		res.status(500).json({
			success: false,
			message: "Error occured",
		});
	}
};

const deleteProduct = async (req, res) => {
	try {
		const { id } = req.params;
		const product = await Product.findByIdAndDelete(id);

		if (!product)
			return res.status(404).json({
				success: false,
				message: "Product not found",
			});

		res.status(200).json({
			success: true,
			message: "Product delete successfully",
		});
	} catch (e) {
		console.log(e);
		res.status(500).json({
			success: false,
			message: "Error occured",
		});
	}
};

const fetchProduct = async (req, res) => {
	try {
		const { id } = req.params;
		const product = await Product.findById(id);
		res.status(200).json({
			success: true,
			data: product,
		});
	} catch (e) {
		console.log(e);
		res.status(500).json({
			success: false,
			message: "Error occured",
		});
	}
};

module.exports = {
	addProduct,
	fetchAllProducts,
	editProduct,
	deleteProduct,
	fetchProduct
};