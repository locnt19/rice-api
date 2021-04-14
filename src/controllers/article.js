const Article = require("../models/article");
const _ = require("lodash");
const constant = require("../constant");

exports.findAll = (req, res) => {
  const page = req.query.page || 1;

  const options = {
    page,
    sort: { _id: 1 },
    limit: 10
  };

  Article.paginate({ isDeleted: false }, options)
    .then(articleList =>
      res.status(constant.STATUS.CODE_200).json({
        responseCode: constant.STATUS.CODE_200,
        data: articleList.docs,
        pagination: { ...articleList, docs: undefined }
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
  Article.findOne({ _id: req.params.id })
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
  const isDeleted = { isDeleted: false };
  const query = { ...req.query, ...isDeleted };
  Article.find(query)
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
  const { name, postID, bio, content, avatar } = req.body;

  const newUpdateArticle = {
    name,
    postID,
    bio,
    content,
    avatar
  };
  Article.findOneAndUpdate({ _id: req.params.id }, newUpdateArticle)
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
  console.log(req.body);
  if (req.body.id) {
    Article.findOneAndUpdate({ _id: req.body.id }, { isDeleted: true })
      .then(() =>
        res.status(constant.STATUS.CODE_200).json({
          responseCode: constant.STATUS.CODE_200,
          message: constant.RESPONSE.MESSAGE_DELETED.replace(
            "{document}",
            "article"
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
