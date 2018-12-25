const router = require("express").Router();
const helper = require("../Helper");
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
router.post(
  "/authenticate/uploadProfilePhoto",
  Auth.isAuthenticated(),
  helper.upload.single("profilePhoto"),
  userController.uploadProfilePhoto
);

module.exports = {
  router: router
};
