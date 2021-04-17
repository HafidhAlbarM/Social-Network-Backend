const express = require("express");
const { signup, signin, signout } = require("../controllers/auth");
const validator = require("../validator");

const router = express.Router();

router.post("/user/signup", validator.createUserValidator, signup);
router.post("/user/signin", validator.signinValidator, signin);
router.get("/user/signout", signout);

module.exports = router;
