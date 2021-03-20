const userController = require("./user");
const productCategoryController = require("./product-category");
const articleCategoryController = require("./article-category");
const productController = require("./product");
const fileController = require("./file");

const controller = {
  userController,
  productCategoryController,
  articleCategoryController,
  productController,
  fileController
};

module.exports = controller;
