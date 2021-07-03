const express = require("express");
const UserController = require("../controllers/UserController");
const { authenticate } = require('../middlewares/authenticate');
const { validateUser, validateAdmin, validateCreateAccount } = require('../middlewares/validate')

const router = express.Router();

router.get("/permissions", [authenticate, UserController.getPermissions]);
router.get("/users", [authenticate, validateAdmin, UserController.getUsers])
router.get("/user", [authenticate, validateUser, UserController.getUserById])
router.post("/create-account", [authenticate, validateAdmin, validateCreateAccount, UserController.createAccount]);

module.exports = router;
