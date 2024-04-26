const express = require("express");
const app = express();
const usermodal = require("./usermodal");

app.get("/", (req, res) => {
  res.send("hey i am using Express and node");
});

app.get("/create", async (req, res) => {
  let CreatedUser = await usermodal.create({
    name: "vikram Singh",
    email: "VikramSingh02@gmail.com",
    username: "vicky Kumar singh",
  });
  res.send(CreatedUser);
});
app.get("/read", async (req, res) => {
  let readData = await usermodal.find();
  // let readData = await usermodal.find({username : "Ashish"});
  res.send(readData);
});
app.get("/update", async (req, res) => {
  let update = await usermodal.findOneAndUpdate(
    { username: "Ashish Kanojia" },
    { name: "Ashish" },
    { new: true }
  );
  res.send(update);
});
app.get("/delete", async (req, res) => {
  let deletedata = await usermodal.findOneAndDelete({ name: "Ashihs" });
  res.send(deletedata);
});

app.listen(3000);
