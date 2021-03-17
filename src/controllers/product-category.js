const ProductCategory = require("../models/product-category");
const constant = require("../constant");
const validator = require("validator");

exports.findAll = (req, res) => {
  ProductCategory.find()
    .then(productCategoryList =>
      res.status(constant.STATUS.CODE_200).json({
        responseCode: constant.STATUS.CODE_200,
        data: productCategoryList
      })
    )
    .catch(error =>
      res.status(constant.STATUS.CODE_500).json({
        responseCode: constant.STATUS.CODE_500,
        error: constant.ERROR.SOMETHING
      })
    );
};
exports.createProductCategory = (req, res) => {
  const productCategory = new ProductCategory(req.body);
  if (!validator.isEmpty(productCategory.name)) {
    productCategory.save(err => {
      if (err) {
        res.status(constant.STATUS.CODE_500).json({
          responseCode: constant.STATUS.CODE_500,
          error: constant.ERROR.SOMETHING
        });
      } else {
        res.status(constant.STATUS.CODE_201).json({
          responseCode: constant.STATUS.CODE_201,
          message: constant.RESPONSE.MESSAGE_CREATED.replace(
            "{document}",
            "product category"
          )
        });
      }
    });
  } else {
    res.status(constant.STATUS.CODE_400).json({
      responseCode: constant.STATUS.CODE_400,
      error: constant.ERROR.FIELD.FIELD_REQUIRED.replace("{field}", "name")
    });
  }
};
exports.updateProductCategory = async (req, res) => {
  if (req.body.name) {
    await ProductCategory.findOneAndUpdate(
      { _id: req.params.id },
      { name: req.body.name },
      error => {
        if (error) {
          res.status(constant.STATUS.CODE_500).json({
            responseCode: constant.STATUS.CODE_500,
            error: constant.ERROR.SOMETHING
          });
        }
      }
    );
    res.status(constant.STATUS.CODE_200).json({
      responseCode: constant.STATUS.CODE_200,
      message: constant.RESPONSE.MESSAGE_UPDATED
    });
  } else {
    res.status(constant.STATUS.CODE_400).json({
      responseCode: constant.STATUS.CODE_400,
      error: constant.ERROR.FIELD.FIELD_REQUIRED.replace("{field}", "id")
    });
  }
};
exports.deleteProductCategory = async (req, res) => {
  if (req.body.id) {
    await ProductCategory.findOneAndUpdate(
      { _id: req.body.id },
      { isDeleted: true },
      error => {
        if (error) {
          res.status(constant.STATUS.CODE_500).json({
            responseCode: constant.STATUS.CODE_500,
            error: constant.ERROR.SOMETHING
          });
        }
      }
    );
    res.status(constant.STATUS.CODE_200).json({
      responseCode: constant.STATUS.CODE_200,
      message: constant.RESPONSE.MESSAGE_DELETED
    });
  } else {
    res.status(constant.STATUS.CODE_400).json({
      responseCode: constant.STATUS.CODE_400,
      error: constant.ERROR.FIELD.FIELD_REQUIRED.replace("{field}", "_id")
    });
  }
};
