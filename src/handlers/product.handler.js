const products = require("../models/product.model");
const productService = require("../services/product.services")

const getProducts = (req, res) => {
    const products = productService.getAllProductss();
    res.json(products);
};

const createProduct = (req, res) => {
    const { Name, Category, Price} = req.body;
    const product = productService.createProduct(Name, Category, Price);
    res.status(201).json(product);
}


const updateProductPrice = (req, res) => {
    const { Name, NewPrice} = req.body;
    const product = productService.updateProductPrice(Name, NewPrice);
    res.status(201).json(product);
}


module.exports = {
    getProducts,
    createProduct,
    updateProductPrice
}