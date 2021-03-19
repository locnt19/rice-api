const Product = require("../models/product");
const _ = require("lodash");
const constant = require("../constant");
const validator = require("validator");

exports.findAll = (req, res) => {
  Product.find({ isDeleted: false })
    .then(productList =>
      res.status(constant.STATUS.CODE_200).json({
        responseCode: constant.STATUS.CODE_200,
        data: productList
      })
    )
    .catch(error =>
      res.status(constant.STATUS.CODE_500).json({
        responseCode: constant.STATUS.CODE_500,
        error: constant.ERROR.SOMETHING
      })
    );
};

exports.findById = (req, res) => {
  Product.findOne({ id: req.body.id })
    .then(productList =>
      res.status(constant.STATUS.CODE_200).json({
        responseCode: constant.STATUS.CODE_200,
        data: productList
      })
    )
    .catch(error => {
      res.status(constant.STATUS.CODE_500).json({
        responseCode: constant.STATUS.CODE_500,
        error: constant.ERROR.SOMETHING
      });
    });
};

exports.findLastedProduct = (req, res) => {
  Product.find({ isDeleted: false })
    .sort({ createdAt: -1 })
    .limit(1)
    .then(productList =>
      res.status(constant.STATUS.CODE_200).json({
        responseCode: constant.STATUS.CODE_200,
        data: productList
      })
    )
    .catch(error =>
      res.status(constant.STATUS.CODE_500).json({
        responseCode: constant.STATUS.CODE_500,
        error: constant.ERROR.SOMETHING
      })
    );
};
exports.findProductByCategory = (req, res) => {
  Product.find({ isDeleted: false, categoryID: req.params.id })
    .then(productList =>
      res.status(constant.STATUS.CODE_200).json({
        responseCode: constant.STATUS.CODE_200,
        data: productList
      })
    )
    .catch(error =>
      res.status(constant.STATUS.CODE_500).json({
        responseCode: constant.STATUS.CODE_500,
        error: constant.ERROR.SOMETHING
      })
    );
};

exports.findProductByFilter = (req, res) => {
  Product.find(req.query)
    .then(productList =>
      res.status(constant.STATUS.CODE_200).json({
        responseCode: constant.STATUS.CODE_200,
        data: productList
      })
    )
    .catch(error =>
      res.status(constant.STATUS.CODE_500).json({
        responseCode: constant.STATUS.CODE_500,
        error: constant.ERROR.SOMETHING
      })
    );
};

exports.createProduct = (req, res) => {
  const product = new Product(req.body);
  product
    .save()
    .then(() =>
      res.status(constant.STATUS.CODE_201).json({
        responseCode: constant.STATUS.CODE_201,
        message: constant.RESPONSE.MESSAGE_CREATED.replace(
          "{document}",
          "product"
        )
      })
    )
    .catch(error => {
      const errorList = _.map(error.errors, "message");
      res.status(constant.STATUS.CODE_500).json({
        responseCode: constant.STATUS.CODE_500,
        error: errorList
      });
    });
};

exports.updateProduct = (req, res) => {
  Product.findOneAndUpdate(
    { _id: req.params.id },
    {
      name: req.body.name,
      categoryID: req.body.categoryID,
      price: req.body.price,
      review: req.body.review,
      bio: req.body.bio,
      status: req.body.status
    }
  )
    .then(() =>
      res.status(constant.STATUS.CODE_200).json({
        responseCode: constant.STATUS.CODE_200,
        message: constant.RESPONSE.MESSAGE_UPDATED.replace(
          "{document}",
          "product"
        )
      })
    )
    .catch(error => {
      const errorList = _.map(error.errors, "message");
      res.status(constant.STATUS.CODE_500).json({
        responseCode: constant.STATUS.CODE_500,
        error: errorList
      });
    });
};

exports.deleteProduct = (req, res) => {
  if (req.body.id) {
    Product.findOneAndUpdate({ _id: req.body.id }, { isDeleted: true })
      .then(() =>
        res.status(constant.STATUS.CODE_200).json({
          responseCode: constant.STATUS.CODE_200,
          message: constant.RESPONSE.MESSAGE_DELETED
        })
      )
      .catch(error =>
        res.status(constant.STATUS.CODE_500).json({
          responseCode: constant.STATUS.CODE_500,
          error: constant.ERROR.SOMETHING
        })
      );
  } else {
    res.status(constant.STATUS.CODE_400).json({
      responseCode: constant.STATUS.CODE_400,
      error: constant.ERROR.FIELD.FIELD_REQUIRED.replace("{field}", "_id")
    });
  }
};
