const _ = require("lodash");
const validator = require("validator");

const User = require("../models/user");
const constant = require("../constant");

exports.findAll = (req, res) => {
  User.find()
    .then(userList =>
      res.status(constant.STATUS.CODE_200).json({
        responseCode: constant.STATUS.CODE_200,
        data: userList
      })
    )
    .catch(error =>
      res.status(constant.STATUS.CODE_500).json({
        responseCode: constant.STATUS.CODE_500,
        error: "constants.ERROR.SOMETHING"
      })
    );
};

exports.createUser = (req, res) => {
  const user = new User(req.body);

  //TODO: check perrsion creator when set user.permission

  user
    .save()
    .then(result =>
      res.status(constant.STATUS.CODE_201).json({
        responseCode: constant.STATUS.CODE_201,
        message: constant.RESPONSE.MESSAGE_CREATED.replace("{document}", "user")
      })
    )
    .catch(error => {
      const errorList = _.map(error.errors, "message");

      res.status(constant.STATUS.CODE_500).json({
        responseCode: constant.STATUS.CODE_500,
        error: error.code ? [constant.ERROR.FIELD.DUPLICATE_EMAIL] : errorList
      });
    });
};
