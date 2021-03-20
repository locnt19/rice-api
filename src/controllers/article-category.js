const ArticleCategory = require("../models/article-category");
const constant = require("../constant");
const validator = require("validator");

exports.findAll = (req, res) => {
  ArticleCategory.find({ isDeleted: false })
    .then(articleCategoryList =>
      res.status(constant.STATUS.CODE_200).json({
        responseCode: constant.STATUS.CODE_200,
        data: articleCategoryList
      })
    )
    .catch(error =>
      res.status(constant.STATUS.CODE_500).json({
        responseCode: constant.STATUS.CODE_500,
        error: [constant.ERROR.SOMETHING]
      })
    );
};

exports.createArticleCategory = (req, res) => {
  const articleCategory = new ArticleCategory(req.body);
  if (!validator.isEmpty(articleCategory.name)) {
    articleCategory
      .save()
      .then(() =>
        res.status(constant.STATUS.CODE_201).json({
          responseCode: constant.STATUS.CODE_201,
          message: constant.RESPONSE.MESSAGE_CREATED.replace(
            "{document}",
            "article category"
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

exports.updateArticleCategory = (req, res) => {
  if (req.body.name) {
    ArticleCategory.findOneAndUpdate(
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

exports.deleteArticleCategory = (req, res) => {
  if (req.body.id) {
    ArticleCategory.findOneAndUpdate({ _id: req.body.id }, { isDeleted: true })
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
