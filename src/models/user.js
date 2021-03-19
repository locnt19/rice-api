const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const validator = require("validator");
const constant = require("../constant");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [
        true,
        constant.ERROR.FIELD.FIELD_REQUIRED.replace("{field}", "name")
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
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [
        true,
        constant.ERROR.FIELD.FIELD_REQUIRED.replace("{field}", "password")
      ],
      trim: true,
      minLength: [
        process.env.PASSWORD_MIN_LENGTH,
        constant.ERROR.FIELD.FIELD_MIN_LENGTH.replace(
          "{field}",
          "password"
        ).replace("{length}", process.env.PASSWORD_MIN_LENGTH)
      ]
    },
    permission: {
      type: String,
      default: "guest"
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

userSchema.methods.generateToken = function () {
  const token = jwt.sign(
    { _id: this._id, permission: this.permission },
    process.env.SECRET_KEY,
    { expiresIn: process.env.TOKEN_EXPIRES }
  );
  return token;
};

module.exports = mongoose.model("User", userSchema);
