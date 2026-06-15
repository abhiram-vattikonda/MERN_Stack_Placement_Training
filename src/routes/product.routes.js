const router = require("../routes/main")
const productHandler = require("../handlers/product.handler");


router.get("/products", productHandler.getProducts);
router.post("/products/create", productHandler.createProduct);
router.post("/products/update", productHandler.updateProductPrice);

