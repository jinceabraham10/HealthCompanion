const express = require("express");
const router = express.Router();
const { checkUser,loadOnPageLoad } = require("../controllers/authController.js");
const verifyToken = require("../middlewares/verifyJwt.js");

router.post("/login", checkUser);
router.get("/loadData",verifyToken, loadOnPageLoad);
module.exports = router;
