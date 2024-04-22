const mongoose = require("mongoose");
const UserTypeEnum = require("./userType");

const userSchema = new mongoose.Schema({
  nom: String,
  prenom: String,
  grade: {
    type: String,
    enum: Object.values(UserTypeEnum),
    required: true,
  },
  unite: String,
});

module.exports = mongoose.model("User", userSchema);