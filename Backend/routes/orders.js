const express = require("express");
const router = express.Router();
const {
  newOrder,
  getOrders,
  getOrdersByUser,
  updateOrderStatus,
} = require("../controllers/orderController");

router.route("/").get(getOrders)
router.route("/").post(newOrder);
router.route("/user/:userId").get(getOrdersByUser);
router.route("/:id/status").patch(updateOrderStatus);

module.exports = router;
