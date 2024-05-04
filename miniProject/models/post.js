const { default: mongoose } = require("mongoose");
const mongooser = require("mongoose");

const postSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "user",
  },
  date: {
    type: Date,
    default: Date.now,
  },
  Content: String,
  likes: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "user",
    },
  ],
});

module.exports = mongoose.model("post", postSchema);
