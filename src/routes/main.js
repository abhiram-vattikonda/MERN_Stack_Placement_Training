
const userRouter = require("./user.routes");
const productRouter = require("./product.routes");

const express = require("express");
const router = express.Router();

router.use(express.json());
router.use(userRouter);
router.use(productRouter);

module.exports = router;