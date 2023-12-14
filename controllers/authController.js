const User = require("../models/userModel");

const registerController = async (req, res) => {
  try {
    const users = await User.find();
    const user = users.find((user) => req.body.email === user.email);
    if (user) {
      res
        .status(500)
        .send("User is already registered, Please try with another email");
    } else {
      const { username, email, password } = req.body;
      const newUser = new User(req.body);
      await newUser.save();

      res.status(201).send({
        success: true,
        message: `${username} is created, Email: ${email}, password: ${password}`,
        data: newUser,
      });
    }
  } catch (error) {
    res.status(404).send({
      error: error.message,
      message: "User not created",
    });
  }
};
const loginController = async (req, res) => {
  try {
    const users = await User.find();
    const user = users.find((user) => req.body.email === user.email);
    if (user && req.body.password === user.password) {
      res.status(201).send({
        message: "User is logged in",
        user,
      });
    } else {
      res.status(500).send("Invalid email or password");
    }
  } catch (error) {
    res.status(404).send({
      error: error.message,
      message: "User not logged in",
    });
  }
};
const userController = async (req, res) => {
  try {
    const users = await User.find();
    res.status(201).send({
      message: "all user found",
      data: users,
    });
  } catch (error) {
    res.status(404).send({
      error: error.message,
      message: "User not logged in",
    });
  }
};

module.exports = { registerController, loginController, userController };
