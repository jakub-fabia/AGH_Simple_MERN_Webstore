const express = require("express");

const {
	addProduct,
	editProduct,
	fetchAllProducts,
	deleteProduct,
	fetchProduct,
} = require("../controllers/admin/admin-product-controller.js");

const router = express.Router();

router.post("/add", addProduct);
router.put("/edit/:id", editProduct);
router.delete("/delete/:id", deleteProduct);
router.get("/get", fetchAllProducts);
router.get("/get/:id", fetchProduct);

module.exports = router;