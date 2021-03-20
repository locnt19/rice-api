const userController = require("./user");
const productCategoryController = require("./product-category");
const articleCategoryController = require("./article-category");
const productController = require("./product");
const articleController = require("./article");
const infoController = require("./info");


const controller = {
  userController,
  productCategoryController,
  articleCategoryController,
  productController,
  articleController,
  infoController
};

module.exports = controller;
