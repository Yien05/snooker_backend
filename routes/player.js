const express = require("express");
const mongoose = require("mongoose");
//create a router for players
const router = express.Router();

const {
    getPlayers,     
    getPlayer,
    addNewPlayer,
    updatePlayer,
    deletePlayer

  } = require("../controllers/player");

  // get all Players
  router.get("/", async (req,res) => {
    try {
      const players = await getPlayers();
      res.status(200).json(players);
    } catch (err) {
      res.status(400).send({ error: "Error fetching player: " + err.message });
    }
  });

  // get one player by id
router.get("/:id", async (req, res) => {
    try {
      const id = req.params.id;
      // Validate the ID format before querying the database
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
          error: `Invalid ID format: "${id}". A valid MongoDB ObjectId is required.`,
        });
      }
      const player = await getPlayer(id);
      if (player) {
        res.status(200).send(player);
      } else {
        res.status(400).send("Player not Found");
      }
    } catch (error) {
      res.status(400).send({
        error: error._message,
      });
    }
  });
  
  // add new player
  router.post("/", async (req, res) => {
    try {
      // Retrieve the data from req.body
      const name = req.body.name;
    //   const image = req.body.image;
      // Check for errors
      if (!name ) {
        return res.status(400).send({
          error: "Error: Required player data is missing!",
        });
      }
      // If no errors, pass in all the data to addNewPlayer function from controller
      const newPlayer = await addNewPlayer(
        name,
        // image
      );
      res.status(200).send(newPlayer);
    } catch (error) {
      console.log(error);
      // If there is an error, return the error code
      res.status(400).send({
        error: error._message,
      });
    }
  });

  // update player
router.put("/:id", async (req, res) => {
  try {
    // Retrieve id from URL
    const id = req.params.id;
    const name = req.body.name;
    // Pass in the data into the updatePlayer function
    const updatedPlayer = await updatePlayer(id, name);
    res.status(200).send(updatedPlayer);
  } catch (error) {
    console.log(error)
    // If there is an error, return the error code
    res.status(400).send({
      error: error._message,
    });
  }
});

// delete Player
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
    const player = await getPlayer(id);
    // If the player does not exist
    if (!player) {
      /* !player because it is returning either a single object or null */
      return res.status(404).send({
        error: `Error: No match for a Player found with the id "${id}".`,
      });
    }
    // Trigger the deletePlayer function
    const status = await deletePlayer(id);
    res.status(200).send({
      message: `Alert: Player with the provided id #${id} has been deleted`,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      error: error._message,
    });
  }
});

  module.exports = router;