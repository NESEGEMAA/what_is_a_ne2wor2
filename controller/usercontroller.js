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

module.exports = { registration };
