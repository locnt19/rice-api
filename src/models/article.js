const mongoose = require("mongoose");
const validator = require("validator");
const constant = require("../constant");
const articleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [
        true,
        constant.ERROR.FIELD.FIELD_REQUIRED.replace("{field}", "name")
      ],
      trim: true
    },
    postID: {
      type: String,
      required: [
        true,
        constant.ERROR.FIELD.FIELD_REQUIRED.replace("{field}", "postID")
      ],
      trim: true
    },
    bio: {
      type: String,
      required: [
        true,
        constant.ERROR.FIELD.FIELD_REQUIRED.replace("{field}", "bio")
      ],
      trim: true
    },
    content: {
      type: String,
      required: [
        true,
        constant.ERROR.FIELD.FIELD_REQUIRED.replace("{field}", "content")
      ],
      trim: true
    },
    isDeleted: { type: Boolean, default: false },
    avatar: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Article", articleSchema);
