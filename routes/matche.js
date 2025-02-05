const express = require("express");
const mongoose = require("mongoose");
//create a router for Matche
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
  getMatches,
  getMatche,
  addNewMatche,
  updateMatche,
  deleteMatche,
} = require("../controllers/matche");

const { isValidUser, isAdmin } = require("../middleware/auth");

// get all Matches
router.get("/", async (req, res) => {
  try {
    const matches = await getMatches();
    res.status(200).json(matches);
  } catch (err) {
    res.status(400).send({ error: "Error fetching matche: " + err.message });
  }
});

// get one matche by id
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    // Validate the ID format before querying the database
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        error: `Invalid ID format: "${id}". A valid MongoDB ObjectId is required.`,
      });
    }
    const matche = await getMatche(id);
    if (matche) {
      res.status(200).send(matche);
    } else {
      res.status(400).send("Matche not Found");
    }
  } catch (error) {
    res.status(400).send({
      error: error._message,
    });
  }
});

// add new Matche
router.post("/", isAdmin, async (req, res) => {
  try {
    // Retrieve the data from req.body
    const name1 = req.body.name1;
    const name2 = req.body.name2;
    const date = req.body.date;
    const time = req.body.time;
    const image1 = req.body.image1;
    const image2 = req.body.image2;
    // Check for errors
    if (!name1 || !name2 || !date || !time) {
      console.log(req.body);
      return res.status(400).send({
        error: "Error: Required Matche data is missing!",
      });
    }
    const newMatche = await addNewMatche(
      name1,
      name2,
      date,
      time,
      image1,
      image2
    );
    res.status(200).send(newMatche);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      error: error._message,
    });
  }
});

// update Matche
router.put("/:id", isAdmin, async (req, res) => {
  try {
    // Retrieve id from URL
    const id = req.params.id;
    const name1 = req.body.name1;
    const name2 = req.body.name2;
    const date = req.body.date;
    const time = req.body.time;
    const image1 = req.body.image1;
    const image2 = req.body.image2;
    const updatedMatche = await updateMatche(id, name1, name2, date, time,image1,image2);
    res.status(200).send(updatedMatche);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      error: error._message,
    });
  }
});

// delete Matche
router.delete("/:id", isAdmin, async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        error: `Invalid ID format: "${id}". A valid MongoDB ObjectId is required.`,
      });
    }
    const matche = await getMatche(id);

    if (!matche) {
      return res.status(404).send({
        error: `Error: No match for a Matche found with the id "${id}".`,
      });
    }
    const status = await deleteMatche(id);
    res.status(200).send({
      message: `Alert: Matche with the provided id #${id} has been deleted`,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      error: error._message,
    });
  }
});

module.exports = router;
