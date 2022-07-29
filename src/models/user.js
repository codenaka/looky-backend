const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "Veuillez renseigner votre adresse email"],
    unique: true,
    validate: [validator.isEmail, "Veuillez fournir une adresse email valide"],
  },
  photo: String,
  role: {
    type: String,
    enum: ["user", "manager", "admin"],
    default: "user",
  },
  password: {
    type: String,
    required: [true, "Veuillez fournir un mot de passe"],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Veuillez confirmer votre mot de passe"],
    validate: {
      // This only works on CREATE and SAVE !!!
      validator: function (val) {
        return val === this.password;
      },
      message: "Les mots de passe ne correspondent pas",
    },
  },
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
