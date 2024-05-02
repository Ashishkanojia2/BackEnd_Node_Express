const { default: mongoose } = require("mongoose");
const mongooser = require("mongoose");

const postSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  date: {
    type: date,
    default: date.now,
  },
  Content: String,
  liks: [{
    type:mongoose.Schema.ObjectId
  }],
});

module.exports = mongoose.model("post", postSchema);
