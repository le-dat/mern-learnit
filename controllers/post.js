const Post = require("../models/posts");

module.exports.getAll = async (req, res, next) => {
  try {
    const posts = await Post.find({ user: req.userId }).populate("user", ["name"]);
    return res.json({ success: true, posts });
  } catch (err) {
    console.log(err);
    res.status(401).json({ success: false, message: "server error" });
  }
};

module.exports.create = async (req, res, next) => {
  const { title, description, url, status } = req.body;
  if (!title) {
    return res.status(401).json({ success: false, message: "Title is required" });
  }
  try {
    const formatUrl = url.startsWith("https://") ? url : `https://${url}`;
    const formatStatus = status ? status : "TO LEARN";
    const newPost = new Post({
      title,
      description,
      url: formatUrl,
      status: formatStatus,
      user: req.userId,
    });
    await newPost.save();

    res.status(201).json({ success: true, message: "Post created successfully", newPost });
  } catch (err) {
    console.log(err);
    res.status(401).json({ success: false, message: "server error" });
  }
};

module.exports.update = async (req, res, next) => {
  const { title, description, url, status } = req.body;
  if (!title) {
    return res.status(401).json({ success: false, message: "Title is required" });
  }
  try {
    const formatUrl = url.startsWith("https://") ? url : `https://${url}`;
    const formatStatus = status ? status : "TO LEARN";
    let updatePost = {
      title,
      description,
      url: formatUrl,
      status: formatStatus,
      user: req.userId,
    };

    const postUpdateCondition = { _id: req.params.id, user: req.userId }; // req.userId created in verifyToken
    updatePost = await Post.findOneAndUpdate(postUpdateCondition, updatePost, { new: true });
    if (!updatePost) {
      return res
        .status(401)
        .json({ success: false, message: "Post not found or user not authenticated" });
    }

    res.status(201).json({ success: true, message: "Post update successfully", updatePost });
  } catch (err) {
    console.log(err);
    res.status(401).json({ success: false, message: "server error" });
  }
};

module.exports.deletePost = async (req, res, next) => {
  try {
    const postUpdateCondition = { _id: req.params.id, user: req.userId }; // req.userId created in verifyToken
    deletePost = await Post.findOneAndDelete(postUpdateCondition);
    if (!deletePost) {
      return res
        .status(401)
        .json({ success: false, message: "Post not found or user not authenticated" });
    }

    res.status(201).json({ success: true, message: "Post deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(401).json({ success: false, message: "server error" });
  }
};
