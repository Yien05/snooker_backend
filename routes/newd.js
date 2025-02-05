const express = require("express");
const mongoose = require("mongoose");
//create a router for Newds
const router = express.Router();
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

const {
  getNewds,
  getNewd,
  addNewNewd,
  updateNewd,
  deleteNewd,
} = require("../controllers/newd");

const { isValidUser, isAdmin } = require("../middleware/auth");

// get all Newds
router.get("/", async (req, res) => {
  try {
    const { sortBy, sortOrder } = req.query;
    const newds = await getNewds(sortBy, sortOrder);
    res.status(200).json(newds);
  } catch (err) {
    res.status(400).send({ error: "Error fetching newd: " + err.message });
  }
});

// get one newd by id
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        error: `Invalid ID format: "${id}". A valid MongoDB ObjectId is required.`,
      });
    }
    const newd = await getNewd(id);
    if (newd) {
      res.status(200).send(newd);
    } else {
      res.status(400).send("New not Found");
    }
  } catch (error) {
    res.status(400).send({
      error: error._message,
    });
  }
});

// add new Newd
router.post("/", isAdmin,async (req, res) => {
  try {
    // Retrieve the data from req.body
    const name = req.body.name;
    const detial = req.body.detial;
    const image = req.body.image;
    // Check for errors
    if (!name||!detial) {
      return res.status(400).send({
        error: "Error: Required Newd data is missing!",
      });
    }
    // If no errors, pass in all the data to addNewNewd function from controller
    const newNewd = await addNewNewd(name, detial,image);
    res.status(200).send(newNewd);
  } catch (error) {
    console.log(error);
    // If there is an error, return the error code
    res.status(400).send({
      error: error._message,
    });
  }
});

// update Newd
router.put("/:id", isAdmin,async (req, res) => {
  try {
    // Retrieve id from URL
    const id = req.params.id;
    const name = req.body.name;
    const detial = req.body.detial;
    const image = req.body.image;
    // Pass in the data into the updateNewd function
    const updatedNewd = await updateNewd(id, name,detial,image);
    res.status(200).send(updatedNewd);
  } catch (error) {
    console.log(error);
    // If there is an error, return the error code
    res.status(400).send({
      error: error._message,
    });
  }
});

// delete Newd
router.delete("/:id", isAdmin,async (req, res) => {
  try {
    // Retrieve the id from the URL
    const id = req.params.id;
    // Validate the ID format before querying the database
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        error: `Invalid ID format: "${id}". A valid MongoDB ObjectId is required.`,
      });
    }
    const newd = await getNewd(id);
    // If the newd does not exist
    if (!newd) {
      /* !newd because it is returning either a single object or null */
      return res.status(404).send({
        error: `Error: No match for a Newd found with the id "${id}".`,
      });
    }
    // Trigger the deleteNewd function
    const status = await deleteNewd(id);
    res.status(200).send({
      message: `Alert: Newd with the provided id #${id} has been deleted`,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      error: error._message,
    });
  }
});

module.exports = router;
