const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    postID: { type: mongoose.SchemaTypes.ObjectId, required: true },
    bio: { type: String, required: true },
    bio: { type: String, required: true },
    content: { type: Number, required: true },
    isDeleted: { type: Boolean, default: false },
    avatar: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Article", articleSchema);
