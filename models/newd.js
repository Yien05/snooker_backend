// schema for movies collection
const { Schema, model } = require("mongoose");

// setup the schema
const newdSchema = new Schema({
    name: {
      type: String,
      required: true,
    },
    // image: String,
  });

  // convert the schema to a model
const Newd = model("Newd", newdSchema);

module.exports = Newd;