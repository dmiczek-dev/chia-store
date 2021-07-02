const express = require("express");
const AuthController = require("../controllers/AuthController");
const Validator = require('../middlewares/validator');

const router = express.Router();

router.post("/login", Validator.validateSignIn, AuthController.login);
router.post("/register", Validator.validateSignUp, AuthController.register);
router.post("/create-account", Validator.validateSignUp, AuthController.createAccount);
router.post("/logout", Validator.validateSignOut, AuthController.logout);
router.post("/refresh-token", Validator.validateRefreshToken, AuthController.refreshToken);

module.exports = router;
