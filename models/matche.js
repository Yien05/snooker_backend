// schema for movies collection
const { Schema, model } = require("mongoose");

// setup the schema
const matcheSchema = new Schema({
  name1: {
    type: String,
    required: true,
  },
  name2: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },

  image1: String,
  image2: String,
});

// convert the schema to a model
const Matche = model("Matche", matcheSchema);

module.exports = Matche;
