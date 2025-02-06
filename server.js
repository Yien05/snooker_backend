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
  .connect(process.env.MONGODB_URL +"/snooker")
  .then(() => {
    // if mongodb is successfully connected
    console.log("MongoDB is connected");
  })
  .catch((error) => {
    console.log(error);
  });

// root route
app.get("/api", (req, res) => {
  res.send("Happy coding!");
});

// import all the routes

app.use("/api/player", require("./routes/player"));
app.use("/api/newd", require("./routes/newd"));
app.use("/api/matche", require("./routes/matche"));
app.use("/api/auth", require("./routes/user"));
app.use("/api/image", require("./routes/image"));

// set a folder as a static path
app.use("/api/uploads", express.static("uploads"));
// start the server
app.listen(5555, () => {
  console.log("Server is running at http://localhost:5555");
});
