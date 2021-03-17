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
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minLength: process.env.PASSWORD_MIN_LENGTH
    },
    permission: {
      type: [String],
      default: ["normal"]
    },
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
      .genSalt(parseInt(process.env.SALT))
      .then(salt => {
        bcrypt
          .hash(this.password, salt)
          .then(passwordIsEncrypted => {
            this.password = passwordIsEncrypted;
            next();
          })
          .catch(error => {
            throw new Error(constant.ERROR.FIELD.PASSWORD_ENCRYPTION_FAILED);
          });
      })
      .catch(error => {
        throw new Error(constant.ERROR.FIELD.GENERATE_SALT_FAILED);
      });
  }
});

module.exports = mongoose.model("User", userSchema);
