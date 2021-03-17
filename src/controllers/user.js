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
