const express = require("express");
const mongoose = require("mongoose");
//create a router for Matche
const router = express.Router();

const {
  getMatches,
  getMatche,
  addNewMatche,
  updateMatche,
  deleteMatche,
} = require("../controllers/matche");

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
router.post("/", async (req, res) => {
  try {
    // Retrieve the data from req.body
    const name1 = req.body.name1;
    const name2 = req.body.name2;
    const date = req.body.date;
    const score1 = req.body.score1;
    const score2 = req.body.score2;
    const time = req.body.time;
    //   const image = req.body.image;
    // Check for errors
    if (!name1 || !name2 || !date || !score1 || !score2 || !time) {
      return res.status(400).send({
        error: "Error: Required Matche data is missing!",
      });
    }
    // If no errors, pass in all the data to addNewMatche function from controller
    const newMatche = await addNewMatche(
      name1,
      name2,
      date,
      score1,
      score2,
      time
      // image
    );
    res.status(200).send(newMatche);
  } catch (error) {
    console.log(error);
    // If there is an error, return the error code
    res.status(400).send({
      error: error._message,
    });
  }
});

// update Matche
router.put("/:id", async (req, res) => {
  try {
    // Retrieve id from URL
    const id = req.params.id;
    const name1 = req.body.name1;
    const name2 = req.body.name2;
    const date = req.body.date;
    const score1 = req.body.score1;
    const score2 = req.body.score2;
    const time = req.body.time;
    // Pass in the data into the updateMatche function
    const updatedMatche = await updateMatche(
      id,
      name1,
      name2,
      date,
      score1,
      score2,
      time
    );
    res.status(200).send(updatedMatche);
  } catch (error) {
    console.log(error);
    // If there is an error, return the error code
    res.status(400).send({
      error: error._message,
    });
  }
});

// delete Matche
router.delete("/:id", async (req, res) => {
  try {
    // Retrieve the id from the URL
    const id = req.params.id;
    // Validate the ID format before querying the database
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        error: `Invalid ID format: "${id}". A valid MongoDB ObjectId is required.`,
      });
    }
    const matche = await getMatche(id);
    // If the matche does not exist
    if (!matche) {
      /* !matche because it is returning either a single object or null */
      return res.status(404).send({
        error: `Error: No match for a Matche found with the id "${id}".`,
      });
    }
    // Trigger the deleteMatche function
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
