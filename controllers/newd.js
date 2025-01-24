const Newd = require("../models/newd");

//get all Newd
const getNewds = async () => {
  const newds = await Newd.find();
  return newds;
};

// get one Newd
const getNewd = async (id) => {
  const newd = await Newd.findById(id);
  return newd;
};

// add new Newd
const addNewNewd = async (name) => {
  // create new Newd
  const newNewd = new Newd({
    name,
    //   image,
  });
  // save the new Newd into mongodb
  await newNewd.save();
  return newNewd;
};

const updateNewd = async (id, name) => {
  const updatedNewd = await Newd.findByIdAndUpdate(
    id,
    { name },
    { new: true }
  );
  return updatedNewd;
};

const deleteNewd = async (_id) => {
  const deleteNewd = await Newd.deleteOne({ _id });
  return deleteNewd;
};

module.exports = {
  getNewds,
  getNewd,
  addNewNewd,
  updateNewd,
  deleteNewd,
};
