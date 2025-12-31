const express = require("express");
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync");
const userController = require("../controllers/users");

// ======================
// SIGNUP
// ======================
router.get("/signup", userController.renderSignupForm);
router.post("/signup", wrapAsync(userController.signup));

// ======================
// LOGIN
// ======================
router.get("/login", userController.renderLoginForm);
router.post("/login", wrapAsync(userController.login));

// ======================
// LOGOUT
// ======================
router.get("/logout", userController.logout);

module.exports = router;

