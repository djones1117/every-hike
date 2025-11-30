const mongoose = require("mongoose");

const commentsSchema = mongoose.Schema({
  username: String,
  userId: {type: mongoose.Schema.Types.ObjectId },
  text: String,
})

const favoritesSchema = mongoose.Schema({
  username: String,
  //One user can have many favorites

  userId: { type: mongoose.Schema.Types.ObjectId },
});
//one post can have many favorites. one user can have many posts.
const postSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  photoUrl: String,
  difficulty: String,
  enum: ["Easy", "Moderate", "Hard"],
  trail: String,
  location: String,
  length: String,
  favorites: [favoritesSchema],
  comments: [commentsSchema]
});

module.exports = mongoose.model("Post", postSchema);
