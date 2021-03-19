const userController = require("./user");
const productCategoryController = require("./product-category");
const articleCategoryController = require("./article-category");
const productController = require("./product");


const controller = {
  userController,
  productCategoryController,
  articleCategoryController,
  productController
};

module.exports = controller;
