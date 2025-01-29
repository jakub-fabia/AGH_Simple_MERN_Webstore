const express = require('express');

const {
	 getProductDetails, fetchAllProducts
} = require('../controllers/shop/product-controller.js')

const router = express.Router();

router.get('/all', fetchAllProducts);
router.get('/get/:id', getProductDetails);

module.exports = router;