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
  score1: {
    type: Number,
    required: true,
  },
  score2: {
    type: Number,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },

  // image: String,
});

// convert the schema to a model
const Matche = model("Matche", matcheSchema);

module.exports = Matche;
