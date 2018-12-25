
'use strict';


const jwt = require('jsonwebtoken');

const request = require('request');
const fs = require('fs');




//custom defined objects
let Doctor = require('../Models/user.models');
let helper = require('../Helper');




exports.createDoctor = function (req, res, next) {
    Doctor.find({userName: req.body.userName}, function (err, doctor) {
        if (doctor.length) {
            res.json({
                status: "200",
                message: "User Already Exists"
            })
        } else {
            let newDoctor = new Doctor(req.body);
            newDoctor.hashedPassword = helper.generateHash(req.body.hashedPassword);
           
            newDoctor.save(function (err, savedObject) {
                if (err) return next(err);
                if (savedObject) {
                    res.json({
                        status: "200",
                        message: "you are registered successfully"
                    })
                }
                next();
            })
        }
    })
};

exports.loginDoctor = function (req, res) {
    Doctor.findOne({userName: req.body.userName, isActive: true}, function (err, Doctor) {
        if (err) return err;
        console.log(Doctor);
        if (!Doctor) {
            
            res.json({
                status: 200,
                "message": "This email is not registered or Active"
            });
        }
        else {
            if (!Doctor.authenticate(req.body.hashedPassword)) {
                if (err) console.log(err);
                
                res.json({
                    status: 200,
                    "message": "This password is not correct."
                })
            }
            else {
                let token = jwt.sign({_id: Doctor._id}, "secret", {expiresIn: "7d"});
                console.log("here");
                serverFile.logger.info('doctor login api, You are logged in successfully '+req.body.email);
                res.json({
                    status: 200,
                    token: token,
                    message: "You are logged in successfully"
                })
            }
        }

    })
};




