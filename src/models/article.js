const mongoose = require("mongoose");
const constant = require("../constant");
const mongoosePaginate = require("mongoose-paginate-v2");

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

articleSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Article", articleSchema);
