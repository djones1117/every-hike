const express = require("express");
const router = express.Router();
const usersCtrl = require("../../controllers/users");

//require these for file uploads!!!
const multer = require("multer");
const upload = multer();
/*---------- Public Routes ----------*/

//HTTP request -> POST /api/users/signup

//we get 'photo' in upload single from the key name on the formdata that
//has the file
//in this scenario, this line of code in  signupPage formData.append('photo', selectedFile);

router.post("/signup", upload.single("photo"), usersCtrl.signup);
router.post("/login", usersCtrl.login);
//params for the api request coming from the react side
//api/users/djones
//api/users/bobo
//api/users/messi

router.get("/:username", usersCtrl.profile);
/*---------- Protected Routes ----------*/

module.exports = router;

/*---------- Protected Routes ----------*/
