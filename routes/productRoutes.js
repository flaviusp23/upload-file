const express = require('express')
const { createProduct, getAllProducts } = require('../controllers/uploadsController')
const { uploadProductImage } = require('../controllers/productController')
const router = express.Router()

router.post('/',createProduct)
router.get('/',getAllProducts)
router.post('/uploads',uploadProductImage)

module.exports = router