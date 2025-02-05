const Newd = require("../models/newd");

// get all Newd
const getNewds = async (sortBy, sortOrder) => {
  const sortParams = {};
  if (sortBy) {
    sortParams[sortBy] = sortOrder === "desc" ? -1 : 1;
  }

  const newds = await Newd.find().sort(sortParams);
  return newds;
};

// get one Newd
const getNewd = async (id) => {
  const newd = await Newd.findById(id);
  return newd;
};

// add new Newd
const addNewNewd = async (name, detial, image) => {
  // create new Newd
  const newNewd = new Newd({
    name,
    detial,
    image,
  });
  // save the new Newd into mongodb
  await newNewd.save();
  return newNewd;
};

const updateNewd = async (id, name, detial, image) => {
  const updatedNewd = await Newd.findByIdAndUpdate(
    id,
    { name, detial, image },
    { new: true }
  );
  return updatedNewd;
};

const deleteNewd = async (_id) => {
  return await Newd.findByIdAndDelete(_id);
};

module.exports = {
  getNewds,
  getNewd,
  addNewNewd,
  updateNewd,
  deleteNewd,
};
