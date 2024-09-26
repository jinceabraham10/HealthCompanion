const express = require("express");
const router = express.Router();
const { checkUser,loadOnPageLoad,checkUserPresent } = require("../controllers/authController.js");
const verifyToken = require("../middlewares/verifyJwt.js");

router.post("/login", checkUser);
router.get("/loadData",verifyToken, loadOnPageLoad);
router.post("/checkUserPresent", checkUserPresent);
module.exports = router;
