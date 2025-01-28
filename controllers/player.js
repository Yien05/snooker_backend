const Player = require("../models/player");

//get all player
const getPlayers = async () => {
  const players = await Player.find();
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

const updatePlayer = async (id, name) => {
  const updatedPlayer = await Player.findByIdAndUpdate(
    id,
    { name },
    { new: true }
  );
  return updatedPlayer;
};

const deletePlayer = async (_id) => {
 return await Player.findByIdAndDelete(id);
};

module.exports = {
  getPlayers,
  getPlayer,
  addNewPlayer,
  updatePlayer,
  deletePlayer,
};
