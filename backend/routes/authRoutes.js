const express = require("express");
const router = express.Router();
const { checkUser } = require("../controllers/authController.js");
router.post("/", checkUser);
module.exports = router;
