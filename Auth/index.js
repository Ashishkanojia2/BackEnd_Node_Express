const express = require("express");
const app = express();
const userModal = require("./Module/user");
const jwt = require("jsonwebtoken");

const cookieParser = require("cookie-parser");
const path = require("path");
const bcrypt = require("bcrypt");
const { JsonWebTokenError } = require("jsonwebtoken");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/find", async (req, res) => {
  let findall = await userModal.find();
  res.send(findall);
});
// app.get("/delete", async (req, res) => {
//   let findall = await userModal.findOneAndDelete({ _id: req.body.id });
//   res.send(findall);
// });
app.post("/create", (req, res) => {
  let { username, password, email, phone } = req.body;
  bcrypt.genSalt(10, function (err, salt) {
    console.log("here is salt", salt);
    bcrypt.hash(password, salt, async function (err, hash) {
      console.log("is Password create", hash);
      let createdUser = await userModal.create({
        username,
        password: hash,
        email,
        phone,
      });
      let tokenkey = jwt.sign({ email }, "secretKey");
      res.cookie("Newtoken", tokenkey);
      res.send(createdUser);
      console.log(createdUser);
    });
  });
});

app.get("/logout", (req, res) => {
  res.cookie("Newtoken", "");
  res.redirect("/");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", async (req, res) => {
  //   res.render("login");
  let user = await userModal.findOne({ email: req.body.email });
  console.log("user ", user);
  if (!user) return res.send("something went wrong");
  console.log("user Password ->", user.password, req.body.password);
  bcrypt.compare(req.body.password, user.password, (err, result) => {
    console.log(result);
    if (result == true) {
      let token = jwt.sign({ email: user.email }, "secretkey");
      res.cookie("Newtoken", token);
      res.send("yes you are log in");
    } else res.send("Something went Wrong");
  });
});

app.listen(3000);
