const mongoose = require("mongoose");

const infoSchema = new mongoose.Schema(
  {
    logo: { type: String, required: true },
    address: { type: String, required: true },
    email: { type: String, required: true },
    hotline: { type: String, required: true},
    phone: { type: String, required: true },
    facebook: { type: Number},
    twitter: { type: Number},
    website: { type: String},
  },
  { timestamps: true }
);

module.exports = mongoose.model("Information", infoSchema);
