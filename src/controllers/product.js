const Product = require("../models/product");
const _ = require("lodash");
const constant = require("../constant");
const validator = require("validator");

exports.findAll = (req, res) => {
  const page = req.query.page || 1;

  const options = {
    page,
    sort: { _id: 1 },
    limit: 10
  };

  Product.paginate({ isDeleted: false }, options)
    .then(productList =>
      res.status(constant.STATUS.CODE_200).json({
        responseCode: constant.STATUS.CODE_200,
        data: productList.docs,
        pagination: { ...productList, docs: undefined }
      })
    )
    .catch(error =>
      res.status(constant.STATUS.CODE_500).json({
        responseCode: constant.STATUS.CODE_500,
        error: [constant.ERROR.SOMETHING]
      })
    );
};

exports.findById = (req, res) => {
  Product.findOne({ _id: req.params.id })
    .then(productList =>
      res.status(constant.STATUS.CODE_200).json({
        responseCode: constant.STATUS.CODE_200,
        data: productList
      })
    )
    .catch(error => {
      res.status(constant.STATUS.CODE_500).json({
        responseCode: constant.STATUS.CODE_500,
        error: [constant.ERROR.SOMETHING]
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
        error: [constant.ERROR.SOMETHING]
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
        error: [constant.ERROR.SOMETHING]
      })
    );
};

exports.findProductByFilter = (req, res) => {
  const isDeleted = { isDeleted: false };
  const query = { ...req.query, ...isDeleted };
  Product.find(query)
    .then(productList =>
      res.status(constant.STATUS.CODE_200).json({
        responseCode: constant.STATUS.CODE_200,
        data: productList
      })
    )
    .catch(error =>
      res.status(constant.STATUS.CODE_500).json({
        responseCode: constant.STATUS.CODE_500,
        error: [constant.ERROR.SOMETHING]
      })
    );
};

exports.createProduct = (req, res) => {
  if (
    validator.isNumeric(req.body.price) &&
    validator.isNumeric(req.body.review)
  ) {
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
  } else {
    const errorList = [];

    if (!validator.isNumeric(req.body.price)) {
      errorList.push(
        constant.ERROR.FIELD.FIELD_REQUIRED_NUMBER.replace("{field}", "price ")
      );
    }
    if (!validator.isNumeric(req.body.review)) {
      errorList.push(
        constant.ERROR.FIELD.FIELD_REQUIRED_NUMBER.replace("{field}", "review ")
      );
    }
    res.status(constant.STATUS.CODE_400).json({
      responseCode: constant.STATUS.CODE_400,
      error: errorList
    });
  }
};

exports.updateProduct = (req, res) => {
  const {
    name,
    categoryID,
    price,
    review,
    bio,
    status,
    avatar,
    images
  } = req.body;

  const newUpdateUser = {
    name,
    categoryID,
    price,
    review,
    bio,
    status,
    avatar,
    images
  };

  if (!newUpdateUser.name) {
    delete newUpdateUser.name;
  }

  if (!newUpdateUser.categoryID) {
    delete newUpdateUser.categoryID;
  }

  if (!newUpdateUser.price) {
    delete newUpdateUser.price;
  }

  if (!newUpdateUser.review) {
    delete newUpdateUser.review;
  }
  if (!newUpdateUser.bio) {
    delete newUpdateUser.bio;
  }

  if (!newUpdateUser.status) {
    delete newUpdateUser.status;
  }

  if (!newUpdateUser.avatar) {
    delete newUpdateUser.avatar;
  }

  if (!newUpdateUser.images) {
    delete newUpdateUser.images;
  }

  Product.findOneAndUpdate({ _id: req.params.id }, newUpdateUser)
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
          message: constant.RESPONSE.MESSAGE_DELETED.replace(
            "{document}",
            "product"
          )
        })
      )
      .catch(error =>
        res.status(constant.STATUS.CODE_500).json({
          responseCode: constant.STATUS.CODE_500,
          error: [constant.ERROR.SOMETHING]
        })
      );
  } else {
    res.status(constant.STATUS.CODE_400).json({
      responseCode: constant.STATUS.CODE_400,
      error: [constant.ERROR.FIELD.FIELD_REQUIRED.replace("{field}", "_id")]
    });
  }
};
