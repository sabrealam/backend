const route = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserModel = require("../models/userModel");

route.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await UserModel.findOne({ email });
    if (user) return res.status(400).send("User already exists");
    bcrypt.hash(password, 10, async function (err, hash) {
      if (err) return res.status(400).send("Registration Failed");
      let newUser = new UserModel({ name, email, password: hash });
      await newUser.save();
      res.status(200).send("Registration Successful");
    });
  } catch (error) {
    res.status(400).send(`/Register --> Registration Failed`);
  }
});

route.post("/login", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await UserModel.findOne({ email });
    if (!user) return res.status(400).send({ message: "User does not exist" });
    let match = await bcrypt.compare(password, user.password);
    if(!match) return res.status(400).send({ message: "Incorrect Password" });
    let token = jwt.sign({id : user._id}, process.env.SECRET_KEY, )
    res.status(200).send({ message: "Login Successful", token: token });
  } catch (error) {
    res.status(400).send({ message: `/Login --> Login Failed` });
  }
});

route.get("/", auth, async (req, res) => {
    try {
      let users = await UserModel.find();
      // if(users.length == 0) return res.status(400).send({message : "No Users Found"})
      res.status(200).send({data : users})
    } catch (error) {
      res.status(400).send({message : error.message})
    }
})

module.exports = route;
