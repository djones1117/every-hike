const Post = require("../models/post");

module.exports = {
  create,
};

async function create(req, res) {
  try {
    const post = await Post.findById(req.params.id);
    const newComment = {
      username: req.user.username,
      userId: req.user._id,
      text: req.body.text,
    };
    post.comments.push(newComment);
    await post.save();
    res.json(newComment);
    res.status(201).json({ comment: newComment, data: "comment added" });
  } catch (error) {
    res.status(400).json({ error: "could not create comment" });
  }
}
