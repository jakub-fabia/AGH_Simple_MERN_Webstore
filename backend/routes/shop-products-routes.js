const express = require('express');

const {
	getFilteredProducts, getProductDetails, fetchAllProducts
} = require('../controllers/shop/product-controller.js')

const router = express.Router();

router.get('/all', fetchAllProducts);
router.get('/get/:id', getProductDetails);
router.get('/get', getFilteredProducts);

module.exports = router;