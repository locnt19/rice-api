const Info = require("../models/info");
const _ = require("lodash");
const constant = require("../constant");
const validator = require("validator");

exports.findAll = (req, res) => {
  Info.findOne({ infoID: 1 })
    .then(infoList =>
      res.status(constant.STATUS.CODE_200).json({
        responseCode: constant.STATUS.CODE_200,
        data: infoList
      })
    )
    .catch(error =>
      res.status(constant.STATUS.CODE_500).json({
        responseCode: constant.STATUS.CODE_500,
        error: [constant.ERROR.SOMETHING]
      })
    );
};
exports.createInfo = (req, res) => {
  const Info = new Info(req.body);
  Info.save()
    .then(() =>
      res.status(constant.STATUS.CODE_201).json({
        responseCode: constant.STATUS.CODE_201,
        message: constant.RESPONSE.MESSAGE_CREATED.replace("{document}", "Info")
      })
    )
    .catch(error =>
      res.status(constant.STATUS.CODE_500).json({
        responseCode: constant.STATUS.CODE_500,
        error: [constant.ERROR.SOMETHING]
      })
    );
};
exports.updateInfo = (req, res) => {
  const {
    logo,
    address,
    email,
    hotline,
    phone,
    facebook,
    twitter,
    website
  } = req.body;

  const newUpdateInfo = {
    logo,
    address,
    email,
    hotline,
    phone,
    facebook,
    twitter,
    website
  };
  if (
    validator.isNumeric(req.body.hotline) &&
    validator.isNumeric(req.body.phone)
  ) {
    Info.findOneAndUpdate({ infoID: 1 }, newUpdateInfo)
      .then(() =>
        res.status(constant.STATUS.CODE_200).json({
          responseCode: constant.STATUS.CODE_200,
          message: constant.RESPONSE.MESSAGE_UPDATED.replace(
            "{document}",
            "Info"
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
  } else {
    const errorList = [];

    if (!validator.isNumeric(req.body.hotline)) {
      errorList.push(
        constant.ERROR.FIELD.FIELD_REQUIRED_NUMBER.replace(
          "{field}",
          "hotline "
        )
      );
    }

    if (!validator.isNumeric(req.body.phone)) {
      errorList.push(
        constant.ERROR.FIELD.FIELD_REQUIRED_NUMBER.replace("{field}", "phone ")
      );
    }

    res.status(constant.STATUS.CODE_400).json({
      responseCode: constant.STATUS.CODE_400,
      error: errorList
    });
  }
};
