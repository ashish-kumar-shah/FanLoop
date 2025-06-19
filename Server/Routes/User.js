const router = require("express").Router();
const { registerValidation } = require("../Auth/RegisterFieldValidator");
const { loginValidation } = require("../Auth/LoginFieldValidator");
const registerUser = require("../Controller/AuthUser/RegisterUser");
const loginUser = require("../Controller/AuthUser/LoginUser");
const { checkUsernameUnique } = require("../Auth/ValidateUserName");
const authMiddleware = require("../Auth/VerifyUser");
const { authenticatUser } = require("../Controller/AuthUser/AuthenticateUser");
const logout = require("../Controller/AuthUser/Logout");

router
  .post("/register", registerValidation, registerUser)
  .post("/login", loginValidation, loginUser)
  .post("/checkusername", checkUsernameUnique)
  .get("/authenticate", authMiddleware, authenticatUser)
  .get("/logout",logout);

module.exports = router;
 