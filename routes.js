const express = require("express");
const router = express.Router();
const usercontroller = require("./controller/usercontroller");

router.post("/signup", usercontroller.registration);
router.post("/want-to-go", usercontroller.handleAddToWantToGo);

module.exports = router;
