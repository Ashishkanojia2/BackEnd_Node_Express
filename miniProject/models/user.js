const { default: mongoose } = require("mongoose");
const mongooser = require("mongoose");

mongoose.connect(`mongodb://127.0.0.1:27017/miniProject`);

const userschema = mongoose.Schema({
  name: String,
  username: String,
  age: Number,
  email: String,
  password: String,
  posts: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "post",
    },
  ],
});

module.exports = mongoose.model("user", userschema);
