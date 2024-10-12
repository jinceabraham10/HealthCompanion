const express = require("express");
const router = express.Router();
const { checkUser,loadOnPageLoad,checkUserPresent, doctorOnPageLoad, laboratoryOnPageLoad, pharmacyOnPageLoad, adminOnPageLoad } = require("../controllers/authController.js");
const verifyToken = require("../middlewares/verifyJwt.js");

router.post("/login", checkUser);
router.get("/loadData/patient",verifyToken, loadOnPageLoad);
router.get("/loadData/doctor",verifyToken, doctorOnPageLoad);
router.get("/loadData/laboratory",verifyToken, laboratoryOnPageLoad);
router.get("/loadData/pharmacy",verifyToken, pharmacyOnPageLoad);
router.get("/loadData/admin",verifyToken, adminOnPageLoad);
router.post("/checkUserPresent", checkUserPresent);
module.exports = router;
