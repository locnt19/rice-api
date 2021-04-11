const mongoose = require("mongoose");
const constant = require("../constant");
const validator = require("validator");

const infoSchema = new mongoose.Schema(
  {
    infoID: { type: Number, default: 1 },
    logo: {
      type: String,
      required: [
        true,
        constant.ERROR.FIELD.FIELD_REQUIRED.replace("{field}", "logo")
      ],
      trim: true
    },
    address: {
      type: String,
      required: [
        true,
        constant.ERROR.FIELD.FIELD_REQUIRED.replace("{field}", "address")
      ],
      trim: true
    },
    email: {
      type: String,
      required: [
        true,
        constant.ERROR.FIELD.FIELD_REQUIRED.replace("{field}", "email")
      ],
      validate: value => {
        if (!validator.isEmail(value, { allow_utf8_local_part: false })) {
          throw new Error(
            constant.ERROR.FIELD.FIELD_INVALID.replace("{field}", "email")
          );
        }
      },
      lowercase: true,
      trim: true
    },
    hotline: {
      type: String,
      required: [
        true,
        constant.ERROR.FIELD.FIELD_REQUIRED.replace("{field}", "hotline")
      ],
      trim: true
    },
    phone: {
      type: String,
      required: [
        true,
        constant.ERROR.FIELD.FIELD_REQUIRED.replace("{field}", "phone")
      ],
      trim: true
    },
    facebook: { type: String },
    twitter: { type: String },
    website: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Information", infoSchema);
