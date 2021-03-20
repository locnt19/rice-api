const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, process.env.PUBLIC_STATIC_FILE);
  },
  filename: (req, file, callback) => {
    const filename =
      file.fieldname + "_" + Date.now() + path.extname(file.originalname);
    callback(null, filename);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    files: 5, // Allow up to 5 files per request
    fieldSize: 5 * 1024 * 1024 // The maximum file size is 5MB
  },
  fileFilter: (req, file, callback) => {
    if (file.originalname.match(/\.(jpg|jpeg|png|gif|mp4|flv)$/)) {
      // Allow only images and video type
      return callback(null, true);
    } else {
      return callback(
        new Error(".jpg, .jpeg, .png, .gif, .mp4, .flv files are allowed."),
        false
      );
    }
  }
});

module.exports = { upload };
