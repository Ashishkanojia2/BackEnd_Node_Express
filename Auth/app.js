const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();

app.use(cookieParser());

app.get("/", (req, res) => {
  res.cookie("name", "AshishCookie");
  res.send("hey guys we are learning Authentaction in MERN");
});
app.get("/read", (req, res) => {
    console.log(req.cookies)
  res.send("this is Read Page");
});

app.listen(3000);
