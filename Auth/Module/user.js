const mongoose = require("mongoose");

mongoose.connect(`mongodb://127.0.0.1:27017/authtestapp`);

const userSchema = mongoose.Schema({
  email: String,
  username: String,
  phone: String,
  password :String
});

module.exports = mongoose.model("user", userSchema);
