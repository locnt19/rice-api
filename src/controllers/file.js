const { upload } = require("../config/multer");

const File = require("../models/file");
const constant = require("../constant");

exports.findAll = (req, res) => {
  File.find()
    .then(files =>
      res
        .status(constant.STATUS.CODE_200)
        .json({ responseCode: constant.STATUS.CODE_200, data: files })
    )
    .catch(error =>
      res.status(constant.STATUS.CODE_500).json({
        responseCode: constant.STATUS.CODE_500,
        error: [constant.ERROR.SOMETHING]
      })
    );
};

exports.uploadFile = (req, res) => {
  const fileList = upload.array("files");

  fileList(req, res, error => {
    if (!error) {
      const files = req.files;
      const fileModel = [];

      if (files && files.length > 0) {
        files.map(file =>
          fileModel.push(
            new File({ path: `${file.destination}/${file.filename}` })
          )
        );

        File.insertMany(fileModel)
          .then(result =>
            res.status(constant.STATUS.CODE_201).json({
              responseCode: constant.STATUS.CODE_201,
              message: constant.RESPONSE.MESSAGE_CREATED.replace(
                "{document}",
                "file"
              )
            })
          )
          .catch(error =>
            res.status(constant.STATUS.CODE_500).json({
              responseCode: constant.STATUS.CODE_500,
              error: [
                constant.RESPONSE.CREATE_FAILED.replace("{document}", "file")
              ]
            })
          );
      } else {
        res.status(constant.STATUS.CODE_400).json({
          responseCode: constant.STATUS.CODE_400,
          error: [constant.ERROR.FIELD.NO_FILE_SELECTED]
        });
      }
    } else {
      res.status(constant.STATUS.CODE_400).json({
        responseCode: constant.STATUS.CODE_400,
        error: [error.message]
      });
    }
  });
};
