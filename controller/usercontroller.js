const usermodel = require("../model/usermodel");

const registration = async (req, res) => {
  try {
    await usermodel.registration(req.body.username, req.body.password);
    res.status(201).json({ msg: "User registered successfully." });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: error.message });
  }
};

const handleAddToWantToGo = async (req, res) => {
  const { destinationName } = req.body;
  const username = req.session.username;

  try {
    const result = await usermodel.addToWantToGoList(username, destinationName);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { registration, handleAddToWantToGo };