const express = require("express");
const ProductController = require("../controllers/ProductController");
const { authenticate } = require('../middlewares/authenticate');
const { validateAdmin, validateCreateProduct, validateEditProduct, validateDeleteProduct } = require("../middlewares/validate");

const router = express.Router();

router.get("/products", [authenticate, ProductController.getProducts]);
router.post("/create-product", [authenticate, validateAdmin, validateCreateProduct, ProductController.createProduct]);
router.post("/edit-product", [authenticate, validateAdmin, validateEditProduct, ProductController.editProduct]);
router.post("/delete-product", [authenticate, validateAdmin, validateDeleteProduct, ProductController.deleteProduct])

module.exports = router;
