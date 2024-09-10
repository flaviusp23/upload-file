const express = require('express')
const { uploadProductImage } = require('../controllers/uploadsController')
const { getAllProducts, createProduct } = require('../controllers/productController')
const router = express.Router()

router.post('/',createProduct)
router.get('/',getAllProducts)
router.post('/uploads',uploadProductImage)

module.exports = router