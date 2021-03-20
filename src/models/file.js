const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema(
  {
    path: {
      type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("File", fileSchema);
