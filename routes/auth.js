const express = require('express');
const { signup, signin, signout } = require("../controllers/auth");
const { userById } = require("../controllers/user");
const validator = require('../validator');

const router = express.Router();

router.post('/user', validator.createUserValidator, signup);
router.post('/user/signin', signin);
router.get('/user/signout', signout);

router.param("userId", userById);

module.exports = router;