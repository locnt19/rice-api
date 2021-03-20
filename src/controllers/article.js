const Article = require("../models/article");
const _ = require("lodash");
const constant = require("../constant");

exports.findAll = (req, res) => {
  Article.find({ isDeleted: false })
    .then(articleList =>
      res.status(constant.STATUS.CODE_200).json({
        responseCode: constant.STATUS.CODE_200,
        data: articleList
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
  Article.findOne({ id: req.body.id })
    .then(articleList =>
      res.status(constant.STATUS.CODE_200).json({
        responseCode: constant.STATUS.CODE_200,
        data: articleList
      })
    )
    .catch(error => {
      res.status(constant.STATUS.CODE_500).json({
        responseCode: constant.STATUS.CODE_500,
        error: [constant.ERROR.SOMETHING]
      });
    });
};

exports.findLastedArticle = (req, res) => {
  Article.find({ isDeleted: false })
    .sort({ createdAt: -1 })
    .limit(1)
    .then(articleList =>
      res.status(constant.STATUS.CODE_200).json({
        responseCode: constant.STATUS.CODE_200,
        data: articleList
      })
    )
    .catch(error =>
      res.status(constant.STATUS.CODE_500).json({
        responseCode: constant.STATUS.CODE_500,
        error: [constant.ERROR.SOMETHING]
      })
    );
};
exports.findArticleByCategory = (req, res) => {
  Article.find({ isDeleted: false, postID: req.params.id })
    .then(articleList =>
      res.status(constant.STATUS.CODE_200).json({
        responseCode: constant.STATUS.CODE_200,
        data: articleList
      })
    )
    .catch(error =>
      res.status(constant.STATUS.CODE_500).json({
        responseCode: constant.STATUS.CODE_500,
        error: [constant.ERROR.SOMETHING]
      })
    );
};

exports.findArticleByFilter = (req, res) => {
  Article.find(req.query)
    .then(articleList =>
      res.status(constant.STATUS.CODE_200).json({
        responseCode: constant.STATUS.CODE_200,
        data: articleList
      })
    )
    .catch(error =>
      res.status(constant.STATUS.CODE_500).json({
        responseCode: constant.STATUS.CODE_500,
        error: [constant.ERROR.SOMETHING]
      })
    );
};

exports.createArticle = (req, res) => {
  const article = new Article(req.body);
  article
    .save()
    .then(() =>
      res.status(constant.STATUS.CODE_201).json({
        responseCode: constant.STATUS.CODE_201,
        message: constant.RESPONSE.MESSAGE_CREATED.replace(
          "{document}",
          "article"
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

exports.updateArticle = (req, res) => {
  Article.findOneAndUpdate(
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

exports.deleteArticle = (req, res) => {
  if (req.body.id) {
    Article.findOneAndUpdate({ _id: req.body.id }, { isDeleted: true })
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
