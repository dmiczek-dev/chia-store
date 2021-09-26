const express = require("express");
const UserController = require("../controllers/UserController");
const {authenticate} = require("../middlewares/authenticate");
const {toggleUserById} = require("../controllers/UserController");
const {
    validateUser,
    validateAdmin,
    validateCreateAccount,
    validateChangeEmail,
    validateChangePassword,
} = require("../middlewares/validate");

const router = express.Router();

router.get("/permissions", [authenticate, UserController.getPermissions]);
router.get("/users", [authenticate, validateAdmin, UserController.getUsers]);
router.get("/user", [authenticate, UserController.getUserById]);
router.post("/create-account", [
    authenticate,
    validateAdmin,
    validateCreateAccount,
    UserController.createAccount,
]);
router.post("/toggle-user", [authenticate, validateAdmin, toggleUserById]);
router.post("/change-password", [
    authenticate,
    validateChangePassword,
    UserController.changePassword,
]);
router.post("/change-email", [
    authenticate,
    validateChangeEmail,
    UserController.changeEmail,
]);

module.exports = router;
