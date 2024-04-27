const mongoose = require("mongoose");
mongoose.connect(`mongodb://127.0.0.1:27017/mongopractice`);

const userSchema = mongoose.Schema({
  // This is Document means Single User Data
  name: String,
  username: String,
  email: String,
});

module.exports = mongoose.model("user", userSchema); // this is Collection .Collection Create using Proural name MEANS 's' add automatically after name user=> users









// const mongoose = require("mongoose");
// mongoose.connect(`mongodb://127.0.0.1:27017/nodemongo`);

// const userSchema2 = mongoose.Schema({
//   FullName: String,
//   Email: String,
//   Phone: Number,
// });

// module.exports = mongoose.model("user", userSchema2);
