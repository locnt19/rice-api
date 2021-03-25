const jwt = require("jsonwebtoken");

const User = require("../models/user");
const constant = require("../constant");

exports.authorization = (req, res, next) => {
  const token = req.headers.authorization?.split(" ");
  if (token) {
    if (token[0] === process.env.TOKEN_TYPE) {
      try {
        const verified = jwt.verify(token[1], process.env.SECRET_KEY);
        User.findById(verified._id)
          .select("-password -__v")
          .then(user => {
            req.body._userAccess = {
              _id: user._id,
              permission: user.permission
            };
            next();
          })
          .catch(error =>
            res.status(constant.STATUS.CODE_500).json({
              responseCode: constant.STATUS.CODE_500,
              error: [constant.ERROR.VERIFICATION_FAILED]
            })
          );
      } catch (error) {
        res.status(constant.STATUS.CODE_400).json({
          responseCode: constant.STATUS.CODE_400,
          errorCode: constant.ERROR.ERROR_001,
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

exports.isAdmin = (req, res, next) => {
  const { _userAccess } = req.body;
  if (_userAccess.permission === "admin") {
    next();
  } else {
    res.status(constant.STATUS.CODE_403).json({
      responseCode: constant.STATUS.CODE_403,
      error: [constant.ERROR.AUTHOR.FORBIDDEN]
    });
  }
};

exports.isEditor = (req, res, next) => {
  const { _userAccess } = req.body;
  if (_userAccess.permission === "editor") {
    next();
  } else {
    res.status(constant.STATUS.CODE_403).json({
      responseCode: constant.STATUS.CODE_403,
      error: [constant.ERROR.AUTHOR.FORBIDDEN]
    });
  }
};

exports.isEditorOrAdmin = (req, res, next) => {
  const { _userAccess } = req.body;
  if (
    _userAccess.permission === "editor" ||
    _userAccess.permission === "admin"
  ) {
    next();
  } else {
    res.status(constant.STATUS.CODE_403).json({
      responseCode: constant.STATUS.CODE_403,
      error: [constant.ERROR.AUTHOR.FORBIDDEN]
    });
  }
};

exports.permissionIsOptional = (req, res, next) => {
  const token = req.headers.authorization?.split(" ");
  try {
    const verified = jwt.verify(token[1], process.env.SECRET_KEY);
    User.findById(verified._id)
      .select("-password -__v")
      .then(user => {
        req.body._userAccess = {
          _id: user._id,
          permission: user.permission
        };
        next();
      });
  } catch (error) {
    next();
  }
};
