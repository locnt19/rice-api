const ProductCategory = require("../models/product-category");
const constant = require("../constant");
const validator = require("validator");

exports.findAll = (req, res) => {
  ProductCategory.find({ isDeleted: false })
    .then(productCategoryList =>
      res.status(constant.STATUS.CODE_200).json({
        responseCode: constant.STATUS.CODE_200,
        data: productCategoryList
      })
    )
    .catch(error =>
      res.status(constant.STATUS.CODE_500).json({
        responseCode: constant.STATUS.CODE_500,
        error: [constant.ERROR.SOMETHING]
      })
    );
};

exports.createProductCategory = (req, res) => {
  const productCategory = new ProductCategory(req.body);

  if (!validator.isEmpty(productCategory.name)) {
    productCategory
      .save()
      .then(() =>
        res.status(constant.STATUS.CODE_201).json({
          responseCode: constant.STATUS.CODE_201,
          message: constant.RESPONSE.MESSAGE_CREATED.replace(
            "{document}",
            "product category"
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
      error: [constant.ERROR.FIELD.FIELD_REQUIRED.replace("{field}", "name")]
    });
  }
};

exports.updateProductCategory = (req, res) => {
  if (req.body.name) {
    ProductCategory.findOneAndUpdate(
      { _id: req.params.id },
      { name: req.body.name }
    )
      .then(() =>
        res.status(constant.STATUS.CODE_200).json({
          responseCode: constant.STATUS.CODE_200,
          message: constant.RESPONSE.MESSAGE_UPDATED
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
      error: [constant.ERROR.FIELD.FIELD_REQUIRED.replace("{field}", "name")]
    });
  }
};

exports.deleteProductCategory = (req, res) => {
  if (req.body.id) {
    ProductCategory.findOneAndUpdate({ _id: req.body.id }, { isDeleted: true })
      .then(() =>
        res.status(constant.STATUS.CODE_200).json({
          responseCode: constant.STATUS.CODE_200,
          message: constant.RESPONSE.MESSAGE_DELETED
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
