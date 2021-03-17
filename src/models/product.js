const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    categoryID: { type: mongoose.SchemaTypes.ObjectId, required: true },
    price: { type: Number, required: true },
    review: { type: Number },
    bio: { type: String, required: true },
    status: { type: Number, required: true },
    isDeleted: { type: Boolean, default: false },
    avatar: { type: String, required: true },
    images: { type: [String], required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
