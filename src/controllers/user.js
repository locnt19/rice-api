const _ = require("lodash");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");

const User = require("../models/user");
const constant = require("../constant");

exports.findWithQuery = (req, res) => {
  delete req.query.password;

  User.find(req.query)
    .select("-password -__v")
    .then(userList =>
      res.status(constant.STATUS.CODE_200).json({
        responseCode: constant.STATUS.CODE_200,
        data: userList
      })
    )
    .catch(error =>
      res.status(constant.STATUS.CODE_500).json({
        responseCode: constant.STATUS.CODE_500,
        error: constants.ERROR.SOMETHING
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

      res.status(constant.STATUS.CODE_400).json({
        responseCode: constant.STATUS.CODE_400,
        error: error.code ? [constant.ERROR.FIELD.DUPLICATE_EMAIL] : errorList
      });
    });
};

exports.deleteUser = (req, res) => {
  User.findByIdAndUpdate({ _id: req.params.id }, { $set: { isDeleted: true } })
    .then(result =>
      res.status(constant.STATUS.CODE_200).json({
        responseCode: constant.STATUS.CODE_200,
        message: constant.RESPONSE.MESSAGE_DELETED.replace("{document}", "user")
      })
    )
    .catch(error => {
      console.log(error);
      res.status(constant.STATUS.CODE_500).json({
        responseCode: constant.STATUS.CODE_500,
        error: [constant.ERROR.SOMETHING]
      });
    });
};

exports.login = async (req, res) => {
  // trim whitespace for email, password
  const user = _.reduce(
    req.body,
    (result, value, key) => {
      result[key] = value.trim();
      return result;
    },
    {}
  );

  const { email = "", password = "" } = user;

  if (
    !validator.isEmpty(email) &&
    validator.isEmail(email, { allow_utf8_local_part: false }) &&
    !validator.isEmpty(password) &&
    password.length >= process.env.PASSWORD_MIN_LENGTH
  ) {
    User.findOne({ email, isDeleted: false })
      .then(user => {
        bcrypt
          .compare(password, user.password)
          .then(matched => {
            if (matched) {
              const token = user.generateToken();

              res.status(constant.STATUS.CODE_200).json({
                responseCode: constant.STATUS.CODE_200,
                data: [{ token_type: process.env.TOKEN_TYPE, token }]
              });
            } else {
              res.status(constant.STATUS.CODE_400).json({
                responseCode: constant.STATUS.CODE_400,
                error: [constant.ERROR.FIELD.INCORRECT_PASSWORD]
              });
            }
          })
          .catch(error => {
            res.status(constant.STATUS.CODE_500).json({
              responseCode: constant.STATUS.CODE_500,
              error: [constant.ERROR.SOMETHING]
            });
          });
      })
      .catch(error => {
        res.status(constant.STATUS.CODE_400).json({
          responseCode: constant.STATUS.CODE_400,
          error: [constant.ERROR.AUTHOR.NO_EXIST_USER]
        });
      });
  } else {
    const errorList = [];

    if (validator.isEmpty(email)) {
      errorList.push(
        constant.ERROR.FIELD.FIELD_REQUIRED.replace("{field}", "email")
      );
    } else if (!validator.isEmail(email, { allow_utf8_local_part: false })) {
      errorList.push(
        constant.ERROR.FIELD.FIELD_INVALID.replace("{field}", "email")
      );
    }

    if (validator.isEmpty(password)) {
      errorList.push(
        constant.ERROR.FIELD.FIELD_REQUIRED.replace("{field}", "password")
      );
    } else if (password.length < process.env.PASSWORD_MIN_LENGTH) {
      errorList.push(
        constant.ERROR.FIELD.FIELD_MIN_LENGTH.replace(
          "{field}",
          "password"
        ).replace("{length}", process.env.PASSWORD_MIN_LENGTH)
      );
    }

    res.status(constant.STATUS.CODE_400).json({
      responseCode: constant.STATUS.CODE_400,
      error: errorList
    });
  }
};

exports.changePassword = (req, res) => {
  res.json(req.body);
};

exports.getMe = (req, res) => {
  const token = req.headers.authorization?.split(" ");
  if (token) {
    if (token[0] === process.env.TOKEN_TYPE) {
      try {
        const verified = jwt.verify(token[1], process.env.SECRET_KEY);
        User.findById(verified._id)
          .select("-password -__v")
          .then(user =>
            res
              .status(constant.STATUS.CODE_200)
              .json({ responseCode: constant.STATUS.CODE_200, data: [user] })
          )
          .catch(error =>
            res.status(constant.STATUS.CODE_500).json({
              responseCode: constant.STATUS.CODE_500,
              error: [constant.ERROR.SOMETHING]
            })
          );
      } catch (error) {
        res.status(constant.STATUS.CODE_400).json({
          responseCode: constant.STATUS.CODE_400,
          error: [constant.ERROR.AUTHOR.TOKEN_EXPIRED]
        });
      }
    } else {
      res.status(constant.STATUS.CODE_400).json({
        responseCode: constant.STATUS.CODE_400,
        error: [constant.ERROR.AUTHOR.INCORRECT_AUTHORIZATION_TYPE]
      });
    }
  } else {
    res.status(constant.STATUS.CODE_401).json({
      responseCode: constant.STATUS.CODE_401,
      error: [constant.ERROR.AUTHOR.NO_AUTHORIZATION]
    });
  }
};
