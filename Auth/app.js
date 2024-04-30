// const cookieParser = require("cookie-parser");
// const express = require("express");
// const bcrypt = require("bcrypt");

// const jwt = require("jsonwebtoken");

// const app = express();

// app.use(cookieParser());
// const saltRounds = 10;
// app.get("/", (req, res) => {
//   //   res.cookie("name", "AshishCookie");    **************************** // HERE IS COOKIE CREATED
//   //   res.send("hey guys we are learning Authentaction in MERN");

//   //   bcrypt.genSalt(saltRounds, function (err, salt) {
//   //     bcrypt.compare(
//   //       "Ashishkanojia",
//   //       "$2b$10$5kUoPGakapNbEyC5JjN6bemBFFvxUJPHbKrNRByZMaHl2EVO/OBFS",
//   //       function (err, result) {
//   //         console.log(result);
//   //       }
//   //     );
//   //   });

//   //   const token = jwt.sign({ email: "Ashish@Kanojia" }, "secret");
//   //   res.cookie("token", token);
//   //   res.send("working")
//   let data = jwt.verify(req.cookies.token, "secret");
//   console.log(data);
// });

// app.get("/read", (req, res) => {
//   console.log(req.cookies); //**********************************************// FOR READING COOKIES
//   res.send("this is Read Page");
// });

// app.listen(3000);
