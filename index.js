const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs"); // fileSystem help to read director data  means file directore
app.set("view engine", "ejs"); // this Line is telling to Express use ejs as a view engine
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//this line telling us to use write the code in ejs Pages and apply JavaScript on it and use image
app.use(express.static(path.join(__dirname, "public")));

app.get("/", function (req, res) {
  fs.readdir(`./files`, (error, files) => {
    res.render("index", { files: files });
  });
});

app.get("/profile", (req, res) => {
  res.render("Profile");
});
app.get("/addtocart", (req, res) => {
  res.render("addtocart/addtocart");
});

app.post("/create", (req, res) => {
  fs.writeFile(
    `./files/${req.body.title.split(" ").join("")}.txt`,
    req.body.details,
    (err) => {
      console.log(err);
      res.redirect("/");
    }
  );

  console.log(req.body);
});
app.get("/files/:filename", (req, res) => {
  fs.readFile(`./files/${req.params.filename}`, "utf-8", (err, filedata) => {
    res.render("show", { filename: req.params.filename, filedata: filedata });
  });
});
app.get("/edit/:filename", (req, res) => {
  res.render("edit", { filename: req.params.filename });
});
app.post("/edit", (req, res) => {
  fs.rename(
    `./files/${req.body.previous}`,
    `./files/${req.body.new}`,
    (err) => {
      res.redirect("/");
    }
  );
  console.log(req.body);
});
app.listen(3000);
