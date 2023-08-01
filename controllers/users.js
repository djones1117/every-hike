const User = require('../models/user');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

const { v4: uuidv4 } = require('uuid');

const S3 = require('aws-sdk/clients/s3');

const s3 = new S3();

const BUCKET_NAME = process.env.BUCKET_NAME

module.exports = {
  signup,
  login
};

async function signup(req, res) {

  console.log(req.body, req.file, ' req.body', 'req.file');

  if(!req.file) return res.status(400).json({error: "Please submit a Photo"})

  const filePath = `everyhike1117/${uuidv4()}-${req.file.originalname}`

  const params = {Bucket: BUCKET_NAME, Key: filePath, Body: req.file.buffer}

  s3.upload(params, async function(err, data){
      if(err){
        console.log('===============================')
        console.log(err, ' <- error from aws, Probably telling you your keys arent correct')
        console.log('===============================')
        res.status(400).json({error: 'error from aws, check your terminal'})
      }
      req.body.photoUrl = data.Location;
      const user = new User(req.body);
      try {
        await user.save();
        const token = createJWT(user);
        res.json({ token });
      } catch (err) {
        // Probably a duplicate email
        res.status(400).json(err);
      }
  
    })

  
}

async function login(req, res) {
 
  try {
    const user = await User.findOne({email: req.body.email});
   
    if (!user) return res.status(401).json({err: 'bad credentials'});
    user.comparePassword(req.body.password, (err, isMatch) => {
      
      if (isMatch) {
        const token = createJWT(user);
        res.json({token});
      } else {
        return res.status(401).json({err: 'bad credentials'});
      }
    });
  } catch (err) {
    return res.status(401).json(err);
  }
}

/*----- Helper Functions -----*/

function createJWT(user) {
  return jwt.sign(
    {user}, // data payload
    SECRET,
    {expiresIn: '24h'}
  );
}
