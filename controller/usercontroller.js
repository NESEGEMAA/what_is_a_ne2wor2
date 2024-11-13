const usermodel = require("../model/usermodel");
const registration = async (req, res) => {
  try {
    await usermodel.registration(req.body.username, req.body.password);
    res.json("done creating");
  } catch (error) {
    console.log(error);
    return res.json({ msg: error.message });
  }
};

module.exports = { registration };
