

const router = require('express').Router();






//user defined
let userController = require('../Controller/user.controller');
let Auth = require('../../Auth/auth.service');




//router for user
router.post('/authenticate/register', userController.createDoctor);
router.post('/authenticate/login',userController.loginDoctor);




module.exports = {
    router: router
};
