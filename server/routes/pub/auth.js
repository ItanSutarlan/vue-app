const express = require("express");
const AuthController = require("../../controllers/auth");
const router = express.Router();

router.post("/register", AuthController.registerCustomer);
router.post("/login", AuthController.loginCustomer);
router.post(
  "/login-google-credential",
  AuthController.loginGoogleCustomerWithCredential
);

module.exports = router;
