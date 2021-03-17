const mongoose = require("mongoose");

const productCategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ProductCategory", productCategorySchema);
