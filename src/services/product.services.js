
const products = require("../models/product.model")
const purchases = require("../models/product.model");
const { get } = require("../routes/user.routes");


const getAllProducts = () => {
    return products;
};


const createProduct = (Name, Category, Price) => {
    const product = {
        id: Date.now(),
        Name,
        Category,
        Price
    };

    products.push(product)
    return product;
}

const updateProductPrice = (Name, NewPrice) => {
    const product = products.find((Name) => product.Name == String(Name));

    if (!product)
        return null;

    product.Price = NewPrice;
    return product;
}


module.exports = {
    updateProductPrice,
    createProduct,
    getAllProducts
}