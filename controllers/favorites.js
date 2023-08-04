const Post = require("../models/post");

module.exports = {
  create,
  deleteFavorite,
};

async function create(req, res) {
  try {
    const post = await Post.findById(req.params.id);
    post.favorites.push({ username: req.user.username, userId: req.user._id });
    await post.save();
    res.status(201).json({ data: "favorite added" });
  } catch (err) {
    res.status(400).json({ err });
  }
}

async function deleteFavorite(req, res) {
  try {
    const post = await Post.findOne({
      "favorites._id": req.params.id,
      "favorites.username": req.user.username,
    });
    post.favorites.remove(req.params.id);

    await post.save();
    res.json({ data: "favorite removed" });
  } catch (err) {
    res.status(400).json({ err });
  }
}
