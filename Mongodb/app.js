//      SIMPLE (CRUD) OPERATIONIN NODE EXPRESS AND MONGODB

// const express = require("express");
// const app = express();
// const usermodal = require("./usermodal");

// app.get("/", (req, res) => {
//   res.send("hey i am using Express and node");
// });

// app.get("/create", async (req, res) => {
//   let CreatedUser = await usermodal.create({
//     name: "vikram Singh",
//     email: "VikramSingh02@gmail.com",
//     username: "vicky Kumar singh",
//   });
//   res.send(CreatedUser);
// });
// app.get("/read", async (req, res) => {
//   let readData = await usermodal.find();
//   // let readData = await usermodal.findOne({username : "Ashish"});
//   res.send(readData);
// });
// app.get("/update", async (req, res) => {
//   let update = await usermodal.findOneAndUpdate(
//     { username: "Ashish Kanojia" },
//     { name: "Ashish" },
//     { new: true }
//   );
//   res.send(update);
// });
// app.get("/delete", async (req, res) => {
//   let deletedata = await usermodal.findOneAndDelete({ name: "Ashihs" });
//   res.send(deletedata);
// });

// app.listen(3000);

//
//
//
//
//
//
//

//******************************************************************************************* */

//    ( CRUD ) OPERATIO USING NODE EXPRESS MONGODB WITH EJS AND SERVER SIDE RENDERING

const express = require("express");
const app = express();
const path = require("path");

const usermodal = require("./modals/user");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/read", async (req, res) => {
  let readdata = await usermodal.find();
  res.render("read", { user: readdata });
});
app.get("/edit/:userid", async (req, res) => {
  let editUser = await usermodal.findOne({ _id: req.params.userid });
  res.render("edit", { editUser });
});
app.post("/create", async (req, res) => {
  let { name, email, image } = req.body;
  let user = await usermodal.create({
    name, //if both the side same name hai to me sirf ek bar name likh sakta hu name:name lie assa hai to,
    email,
    image,
  });
  res.redirect("/read");
});
app.post("/update/:userid", async (req, res) => {
  let { image, name, email } = req.body;
  let updateUser = await usermodal.findOneAndUpdate(
    { _id: req.params.userid },
    { name, email, image },
    { new: true }
  );
  res.redirect("/read");
});
app.get("/deleteUser/:id", async (req, res) => {
  let deleteuser = await usermodal.findOneAndDelete({ _id: req.params.id });
  // res.send("hey",req.params.id)
  res.redirect("/read");

  //    console.log(req.param.body)
});

app.listen(3000);
