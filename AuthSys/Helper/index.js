"use strict";
const bcrypt = require("bcrypt-nodejs");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "ProfilePhotoDir");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  }
});

const upload = multer({ storage: storage });

//only exports
module.exports.generateHash = function(password) {
  return bcrypt.hashSync(password);
};

module.exports.upload = upload;
