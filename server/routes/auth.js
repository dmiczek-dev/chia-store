const express = require("express");
const AuthController = require("../controllers/AuthController");
const { validateSignIn, validateSignUp } = require('../middlewares/validate');
const { authenticate, checkRefreshToken } = require('../middlewares/authenticate');

const router = express.Router();

router.post("/login", [validateSignIn, AuthController.login]);
router.post("/register", [validateSignUp, AuthController.register]);
router.post("/logout", [authenticate, AuthController.logout]);
router.post("/refresh-token", [checkRefreshToken, AuthController.refreshToken]);

module.exports = router;
