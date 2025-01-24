// schema for movies collection
const { Schema, model } = require("mongoose");

// setup the schema
const playerSchema = new Schema({
    name: {
      type: String,
      required: true,
    },
    // image: String,
  });

  // convert the schema to a model
const Player = model("Player", playerSchema);

module.exports = Player;