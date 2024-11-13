const express = require("express");
const router = express.Router();
const usercontroller = require("./controller/usercontroller");

router.post("/signup", usercontroller.registration);

module.exports = router;
