const User = require("../models/user");


const express = require("express");
const router = express.Router();

const { login, signup } = require("../controllers/user");
/*
    2 routes:
    POST /login
    POST /signup
*/

// login route
router.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    // login user via login function
    const user = await login(email, password);
    // send back the user data
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send({
      error: error.message,
    });
  }
});

// sign up route
router.post("/signup", async (req, res) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    // create new user via signup function
    const user = await signup(name, email, password);
    // send back the newly created user data
    res.status(200).send(user);
  } catch (error) {
    console.log(error)
    res.status(400).send({
      error: error.message,
    });
  }
});

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find(); // Get all users
    res.status(200).send(users); // Return the list of users
  } catch (error) {
    res.status(400).send({
      error: error.message,
    });
  }
});


// Update user details
router.put("/:id", async (req, res) => {
  const { name, email, role } = req.body;

  try {
    const user = await User.findById(req.params.id); // Find user by ID

    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    // Update user details
    user.name = name || user.name;
    user.email = email || user.email;
    user.role = role || user.role;

    await user.save(); // Save the updated user

    res.status(200).send({
      message: "User updated successfully",
      user: { name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    res.status(400).send({
      error: error.message,
    });
  }
});


// Delete user by ID
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id); // Find and delete user by ID

    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    res.status(200).send({
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(400).send({
      error: error.message,
    });
  }
});




module.exports = router;
