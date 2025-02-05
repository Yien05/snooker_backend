const Player = require("../models/player");

// get all players with optional search query by name
const getPlayers = async (searchTerm = "") => {
  // If searchTerm is provided, filter by name (case insensitive)
  const players = await Player.find({
    name: { $regex: searchTerm, $options: "i" }, // 'i' for case-insensitive search
  });
  return players;
};

// get one player
const getPlayer = async (id) => {
  const player = await Player.findById(id);
  return player;
};

// add new player
const addNewPlayer = async (name, image) => {
  // create new player
  const newPlayer = new Player({
    name,
    image,
  });
  // save the new player into mongodb
  await newPlayer.save();
  return newPlayer;
};

const updatePlayer = async (id, name, image) => {
  const updatedPlayer = await Player.findByIdAndUpdate(
    id,
    { name, image },
    { new: true }
  );
  return updatedPlayer;
};

const deletePlayer = async (_id) => {
  return await Player.findByIdAndDelete(_id);
};

module.exports = {
  getPlayers,
  getPlayer,
  addNewPlayer,
  updatePlayer,
  deletePlayer,
};
