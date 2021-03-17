const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const constant = require("../constant");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true,
      minLength: 5
    },
    permission: [
      {
        role: String
      }
    ],
    avatar: {
      type: String
    },
    isDeleted: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    bcrypt
      .hash(this.password, process.env.SALT || 10)
      .then(passwordIsEncrypted => {
        this.password = passwordIsEncrypted;
        next();
      })
      .catch(error => {
        throw new Error(constant.ERROR.FIELD.PASSWORD_ENCRYPTION_FAILED);
      });
  }
});

module.exports = mongoose.model("User", userSchema);
