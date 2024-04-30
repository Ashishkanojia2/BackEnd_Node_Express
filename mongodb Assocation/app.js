const express = require("express");
const app = express();

const userModal = require("./models/user");
const postModal = require("./models/post");

app.get("/", (req, res) => {
  res.send("it's Working");
});
app.get("/create", async (req, res) => {
  let userdata = await userModal.create({
    name: "Ashish Kanojia",
    email: "kanojiaashis02@gmail.com",
    age: "21",
  });

  res.send(userdata);
});
app.get("/post/create", async (req, res) => {
  // post ko pata hai ki uska user kon hai by using userid
  let postdata = await postModal.create({
    postdata: "FirstPost",
    user: "663154f2dec29527aa7fa42e",
  });
  // and user ko pata hai vo kon kon si post add krrha hai
  // is se jo bhee post crate hoye gai vo user ki post array me as a posr id store  hoyegai
  // dono side se pata hone chaye ki id's ka
  let user = await userModal.findOne({ _id: "663154f2dec29527aa7fa42e" });
  user.post.push(postdata._id);// ye hmne push ki hai khud se to save function use krna hoga
  await user.save();
  res.send({postdata , user});
});

app.listen(3000);
