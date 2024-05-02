const express = require("express");
const app = express();
const userModal = require("./models/user");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.render("index");
});
//steup user Register

app.post("/register", async (req, res) => {
  let { name, password, username, age, email } = req.body;
  // Check if user already exists
  let user = await userModal.findOne({ email });
  // If user is already present, show warning
  if (user) return res.status(500).send("User already exists");
  bcrypt.genSalt(10, async (err, salt) => {
    if (err) {
      return res.status(500).send("Error generating salt");
    }
    bcrypt.hash(password, salt, async (err, hash) => {
      if (err) {
        return res.status(500).send("Error hashing password");
      }
      try {
        let newUser = await userModal.create({
          name,
          password: hash,
          email,
          age,
          username,
        });
        let token = jwt.sign(
          { email: email, userid: newUser._id },
          "secretkey"
        );
        res.cookie("token", token);
        res.send("User registered");
      } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).send("Error registering user");
      }
    });
  });
});

//steup User Login
app.get("/login", async (req, res) => {
  res.render("login");
});
app.get("/profile", isloggedin, async (req, res) => {
  console.log("data recived from middleWare", req.user);
  res.render("login");
});

app.post("/login", async (req, res) => {
  let { email, password } = req.body;
  let user = await userModal.findOne({ email });
  if (!user) return res.status(500).send("Something went Wrong! ");
  bcrypt.compare(password, user.password, (req, result) => {
    if (result) {
      let token = jwt.sign({ email: email, userid: user._id }, "secretkey");
      res.cookie("token", token);

      return res.status(200).send("your are LoggedIn");
    } else res.status(500).redirect("/login");
  });
});

app.get("/logout", (req, res) => {
  res.cookie("token", "").redirect("/login");
});

// creating MiddleWare For Procting Routes
//IF YOUSER IS NOT lOGIN AND THEY GOES DIFFERETN ROUTES IF WE CHECK IS USERLOGIN OR NOT (HAVING TOKEN OTR NOT)

function isloggedin(req, res, next) {
  if (req.cookies.token === "") res.send("You must be logged in ");
  else {
    let data = jwt.verify(req.cookies.token, "secretkey");
    req.user = data;
    next();
  }
  
}
app.listen(3000);
