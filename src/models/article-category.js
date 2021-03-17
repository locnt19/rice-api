const mongoose = require("mongoose");

const articleCategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ArticleCategory", articleCategorySchema);
