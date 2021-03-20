const _ = require("lodash");
const bcrypt = require("bcrypt");
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
  const { _userAccess } = req.body;

  if (_userAccess && _userAccess.permission !== "admin") {
    user.permission = "guest";
  }

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

exports.updateUser = (req, res) => {
  const { _userAccess, _id, name, avatar, permission, isDeleted } = req.body;

  const newUpdateUser = { name, avatar, permission, isDeleted };

  if (!newUpdateUser.name) {
    delete newUpdateUser.name;
  }

  if (!newUpdateUser.avatar) {
    delete newUpdateUser.avatar;
  }

  if (!newUpdateUser.permission) {
    delete newUpdateUser.permission;
  }

  if (!newUpdateUser.isDeleted) {
    delete newUpdateUser.isDeleted;
  }

  if (_userAccess.permission !== "admin") {
    delete newUpdateUser.permission;
    delete newUpdateUser.isDeleted;
  }

  User.findOneAndUpdate({ _id }, newUpdateUser)
    .then(() =>
      res.status(constant.STATUS.CODE_200).json({
        responseCode: constant.STATUS.CODE_200,
        message: constant.RESPONSE.MESSAGE_UPDATED.replace("{document}", "user")
      })
    )
    .catch(error =>
      res.status(constant.STATUS.CODE_500).json({
        responseCode: constant.STATUS.CODE_500,
        error: [constant.RESPONSE.UPDATE_FAILED.replace("{document}", "user")]
      })
    );
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
  const { _userAccess, password, newPassword } = req.body;

  if (
    password &&
    newPassword &&
    !validator.isEmpty(password) &&
    !validator.isEmpty(newPassword) &&
    password.length >= process.env.PASSWORD_MIN_LENGTH &&
    newPassword.length >= process.env.PASSWORD_MIN_LENGTH
  ) {
    if (password !== newPassword) {
      User.findOne({ _id: _userAccess._id, isDeleted: false })
        .then(user => {
          bcrypt
            .compare(password, user.password)
            .then(matched => {
              if (matched) {
                user.password = newPassword;
                user
                  .save()
                  .then(result =>
                    res.status(constant.STATUS.CODE_200).json({
                      responseCode: constant.STATUS.CODE_200,
                      message: constant.RESPONSE.MESSAGE_UPDATED.replace(
                        "{document}",
                        "password"
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
      res.status(constant.STATUS.CODE_400).json({
        responseCode: constant.STATUS.CODE_400,
        error: [constant.ERROR.FIELD.PASSWORD_THE_SAME]
      });
    }
  } else {
    const errorList = [];

    if (!password || validator.isEmpty(password)) {
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

    if (!newPassword || validator.isEmpty(newPassword)) {
      errorList.push(
        constant.ERROR.FIELD.FIELD_REQUIRED.replace("{field}", "newPassword")
      );
    } else if (newPassword.length < process.env.PASSWORD_MIN_LENGTH) {
      errorList.push(
        constant.ERROR.FIELD.FIELD_MIN_LENGTH.replace(
          "{field}",
          "newPassword"
        ).replace("{length}", process.env.PASSWORD_MIN_LENGTH)
      );
    }

    res.status(constant.STATUS.CODE_400).json({
      responseCode: constant.STATUS.CODE_400,
      error: errorList
    });
  }
};

exports.getMe = (req, res) => {
  const { _userAccess } = req.body;

  User.findById(_userAccess._id)
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
};
