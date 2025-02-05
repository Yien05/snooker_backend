const Matche = require("../models/matche");

//get all Matche
const getMatches = async () => {
  const matches = await Matche.find();
  return matches;
};

// get one Matche
const getMatche = async (id) => {
  const matche = await Matche.findById(id);
  return matche;
};

// add new Matche
const addNewMatche = async (name1, name2, date, time, image1, image2) => {
  // create new Matche
  const newMatche = new Matche({
    name1,
    name2,
    date,
    time,
    image1,
    image2,
  });
  // save the new Matche into mongodb
  await newMatche.save();
  return newMatche;
};

const updateMatche = async (id, name1, name2, date, time, image1, image2) => {
  const updatedMatche = await Matche.findByIdAndUpdate(
    id,
    { name1, name2, date, time, image1, image2 },
    { new: true }
  );
  return updatedMatche;
};

const deleteMatche = async (_id) => {
  const deleteMatche = await Matche.deleteOne({ _id });
  return deleteMatche;
};

module.exports = {
  getMatches,
  getMatche,
  addNewMatche,
  updateMatche,
  deleteMatche,
};
