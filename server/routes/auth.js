const express = require("express");
const AuthController = require("../controllers/auth");
const router = express.Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.post(
  "/login-google-credential",
  AuthController.loginGoogleWithCredential
);
router.post("/login-google-token", AuthController.loginGoogleWithAccessToken);

module.exports = router;
