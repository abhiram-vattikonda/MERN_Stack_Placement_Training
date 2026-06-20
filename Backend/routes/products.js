const express = require("express");
const router = express.Router();
const {
  createProduct,
  getProducts,
  updatePrice,
  deleteProduct,
} = require("../controllers/productController");

router.route("/").get(getProducts)
router.route("/").post(createProduct);
router.route("/:id/price").patch(updatePrice);
router.route("/:id").delete(deleteProduct);

module.exports = router;
