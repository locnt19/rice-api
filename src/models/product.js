const mongoose = require("mongoose");
const constant = require("../constant");
const validator = require("validator");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [
        true,
        constant.ERROR.FIELD.FIELD_REQUIRED.replace("{field}", "name")
      ],
      trim: true
    },
    categoryID: {
      type: String,
      required: [
        true,
        constant.ERROR.FIELD.FIELD_REQUIRED.replace("{field}", "categoryID")
      ],
      trim: true
    },
    price: {
      type: Number,
      required: [
        true,
        constant.ERROR.FIELD.FIELD_REQUIRED.replace("{field}", "price")
      ],
      trim: true
    },
    review: {
      type: Number
    },
    bio: {
      type: String,
      required: [
        true,
        constant.ERROR.FIELD.FIELD_REQUIRED.replace("{field}", "bio")
      ],
      trim: true
    },
    status: { type: Number, default: 1 },
    isDeleted: { type: Boolean, default: false },
    avatar: { type: String },
    images: { type: [String] }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
