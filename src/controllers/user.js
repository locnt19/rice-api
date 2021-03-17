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

  if (
    !validator.isEmpty(user.name) &&
    !validator.isEmpty(user.email) &&
    validator.isEmail(user.email, { allow_utf8_local_part: false }) &&
    !validator.isEmpty(user.password) &&
    user.password.length >= process.env.PASSWORD_MIN_LENGTH
  ) {
    User.findOne({ email: user.email })
      .then(emailExists => {
        if (!emailExists) {
          user
            .save()
            .then(result => {
              res.status(constant.STATUS.CODE_201).json({
                responseCode: constant.STATUS.CODE_201,
                message: constant.RESPONSE.MESSAGE_CREATED.replace(
                  "{document}",
                  "user"
                )
              });
            })
            .catch(error =>
              res.status(constant.STATUS.CODE_500).json({
                responseCode: constant.STATUS.CODE_500,
                error: constant.ERROR.SOMETHING
              })
            );
        } else {
          res.status(constant.STATUS.CODE_400).json({
            responseCode: constant.STATUS.CODE_400,
            error: constant.ERROR.FIELD.DUPLICATE_EMAIL
          });
        }
      })
      .catch(error =>
        res.status(constant.STATUS.CODE_500).json({
          responseCode: constant.STATUS.CODE_500,
          error: constant.ERROR.SOMETHING
        })
      );
  } else {
    if (validator.isEmpty(user.name)) {
      res.status(constant.STATUS.CODE_400).json({
        responseCode: constant.STATUS.CODE_400,
        error: constant.ERROR.FIELD.FIELD_REQUIRED.replace("{field}", "name")
      });
    }

    if (validator.isEmpty(user.email)) {
      res.status(constant.STATUS.CODE_400).json({
        responseCode: constant.STATUS.CODE_400,
        error: constant.ERROR.FIELD.FIELD_REQUIRED.replace("{field}", "email")
      });
    } else if (
      !validator.isEmail(user.email, { allow_utf8_local_part: false })
    ) {
      res.status(constant.STATUS.CODE_400).json({
        responseCode: constant.STATUS.CODE_400,
        error: constant.ERROR.FIELD.FIELD_INVALID.replace("{field}", "email")
      });
    }

    if (validator.isEmpty(user.password)) {
      res.status(constant.STATUS.CODE_400).json({
        responseCode: constant.STATUS.CODE_400,
        error: constant.ERROR.FIELD.FIELD_REQUIRED.replace(
          "{field}",
          "password"
        )
      });
    } else if (user.password.length < process.env.PASSWORD_MIN_LENGTH) {
      res.status(constant.STATUS.CODE_400).json({
        responseCode: constant.STATUS.CODE_400,
        error: constant.ERROR.FIELD.FIELD_MIN_LENGTH.replace(
          "{field}",
          "password"
        ).replace("{length}", process.env.PASSWORD_MIN_LENGTH)
      });
    }
  }
};
