const Post = require("../models/post");





//creates a random number for the file names
//every file name will be unique because of that number
const { v4: uuidv4 } = require('uuid');
//import the s3 constructor 
const S3 = require('aws-sdk/clients/s3');
// init the S3 constructor. This gives us an object to talk to aws
const s3 = new S3();


//!!! put in .env file. Everyone has a unique bucket name
//and we don't want to push that to Github
const BUCKET_NAME = process.env.BUCKET_NAME

module.exports = {
    create,
    index
}


function create(req, res){
    console.log(req.body, req.file, " < req.body, req.file in posts/api create");
    //checks for file (photo). If no file is found return the error.
  if(!req.file) return res.status(400).json({error: "Please submit a Photo"})

  //this is where our file is stored on aws s3
  const filePath = `everyhike1117/posts/${uuidv4()}-${req.file.originalname}`

  const params = {Bucket: BUCKET_NAME, Key: filePath, Body: req.file.buffer}
  
  s3.upload(params, async function (err, data) {
    if (err) {
      console.log("===========================================");
      console.log(
        err,
        " err from aws, either your bucket name is wrong or your keys arent correct"
      );
      console.log("===========================================");
      res.status(400).json({ error: "Error from aws, check your terminal!" });
    }
    try {
        // Use our Model to create a document in the posts collection in Mongodb
        const post = await Post.create({
          difficulty: req.body.difficulty,
          trail: req.body.trail,
          length: req.body.length,
          location: req.body.location,
          user: req.user, // req.user is defined in config/auth if we the client sends over the jwt token
          photoUrl: data.Location, // data.Location comes from the callback in the s3 upload
        });
  
        await post.populate("user"); // populating on a mongoose document! this gives us the user object
        // this response will show up in the feedPage in   const responseData = await postsApi.create(post);
        res.status(201).json({ data: post }); // <- this is what responseData should be
      } catch (err) {
        res.status(400).json({ error: err });
      }
    });
  }





async function index(req, res){
    try {
        const posts = await Post.find({}).populate("user").exec();
        res.status(200).json({ posts });
    } catch (err) {}
}