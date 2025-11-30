const User = require("../models/user");
const Post = require("../models/post");
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;

//creates a random number for the file names
//every file name will be unique because of that number
const { v4: uuidv4 } = require("uuid");
//import the s3 constructor
const S3 = require("aws-sdk/clients/s3");
// init the S3 constructor. This gives us an object to talk to aws
const s3 = new S3();

//!!! put in .env file. Everyone has a unique bucket name
//and we don't want to push that to Github
const BUCKET_NAME = process.env.BUCKET_NAME;

module.exports = {
  signup,
  login,
  profile,
};

async function profile(req, res) {
  try {
    //first find the user using the params from the request
    //findOne finds first match, its useful to have unique usernames!!
    const user = await User.findOne({ username: req.params.username.trim() });
    // then find all the posts that belong to that user
    if (!user) return res.status(404).json({ error: "User not found" });

    //using the post model to find all the users posts (the user from req.params)
    //finding all posts by a user, and populating the user property!
    const posts = await Post.find({ user: user._id }).populate("user").exec();
    console.log(posts, " this posts");
    res.status(200).json({ posts: posts, user: user });
  } catch (err) {
    console.log(err);
    res.status(400).json({ err });
  }
}

async function signup(req, res) {
  console.log(req.body, req.file, " req.body", "req.file");
  //checks for file (photo). If no file is found return the error.
  if (!req.file)
    return res.status(400).json({ error: "Please submit a Photo" });

  //this is where our file is stored on aws s3
  const filePath = `everyhike1117/${uuidv4()}-${req.file.originalname}`;
  // creates the object that we want to send to aws
  const params = { Bucket: BUCKET_NAME, Key: filePath, Body: req.file.buffer };

  s3.upload(params, async function (err, data) {
    if (err) {
      console.log("===============================");
      console.log(
        err,
        " <- error from aws, Probably telling you your keys arent correct"
      );
      console.log("===============================");
      res.status(400).json({ error: "error from aws, check your terminal" });
    }

    //if s3 upload is successful then create the user and store the file location.
    //data.Location is what we get back from aws of where our file is stored
    req.body.photoUrl = data.Location;
    const user = new User(req.body);
    try {
      await user.save();
      const token = createJWT(user);
      res.json({ token });
      //response is processed by the client
      //utils/userService signup function, inside of the .thens
    } catch (err) {
      console.log(err);
      // Probably a duplicate email
      console.log(err);
      res.status(400).json(err);
    }
  });
}

async function login(req, res) {
  try {
    //finds the user by the users email
    const user = await User.findOne({ email: req.body.email });

    if (!user) return res.status(401).json({ err: "bad credentials" });
    //checks the password and checks if there is a match
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (isMatch) {
        //if the password matches then create a jwt token attached to the user
        //and send it back to the client
        //you can check to see the key value in application-local storage on your dev tools
        const token = createJWT(user);
        res.json({ token });
      } else {
        return res.status(401).json({ err: "bad credentials" });
      }
    });
  } catch (err) {
    return res.status(401).json(err);
  }
}

/*----- Helper Functions -----*/

function createJWT(user) {
  return jwt.sign(
    { user }, // data payload
    SECRET,
    { expiresIn: "24h" }
  );
}
