const express = require("express");
const router = express.Router();
const productHandler = require("../handlers/product.handler");


router.get("/products", productHandler.getProducts);
router.post("/products/create", productHandler.createProduct);
router.post("/products/update", productHandler.updateProductPrice);

module.exports = router;

