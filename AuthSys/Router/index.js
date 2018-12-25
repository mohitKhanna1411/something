const router = require("express").Router();

//user defined
let userController = require("../Controller/user.controller");
let Auth = require("../../Auth/auth.service");

//router for user
router.post("/authenticate/register", userController.createUser);
router.post("/authenticate/login", userController.loginUser);
router.post(
  "/authenticate/editDetails",
  Auth.isAuthenticated(),
  userController.editDetails
);

module.exports = {
  router: router
};
