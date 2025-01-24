require("dotenv").config();
// import express
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// create the express app
const app = express();

// middleware to handle JSON request
app.use(express.json());

// setup cors policy
app.use(cors());

// connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/snooker")
  .then(() => {
    // if mongodb is successfully connected
    console.log("MongoDB is connected");
  })
  .catch((error) => {
    console.log(error);
  });

// root route
app.get("/", (req, res) => {
  res.send("Happy coding!");
});

// import all the routes

app.use("/player", require("./routes/player"));
app.use("/newd", require("./routes/newd"));
app.use("/matche", require("./routes/matche"));
app.use("/auth", require("./routes/user"));

// start the server
app.listen(5555, () => {
  console.log("Server is running at http://localhost:5555");
});
