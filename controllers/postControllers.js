const post = require("../models/Post");

exports.getAllPosts = async (req, res) => {
  const posts = await post.find({}).sort("-dateCreated");
  res.render("index", {
    posts,
  });
};

exports.getPost = async (req, res) => {
  const Post = await post.findById(req.params.id);
  res.render("post", {
    Post,
  });
};

exports.createPost = async (req, res) => {
  await post.create(req.body);
  res.redirect("/");
};

exports.updatePost = async (req, res) => {
  const Post = await post.findById(req.params.id);
  Post.title = req.body.title;
  Post.subTitle = req.body.subTitle;
  Post.author = req.body.author;
  Post.article = req.body.article;
  Post.save();

  res.redirect(`/posts/${Post.id}`);
};

exports.deletePost = async (req, res) => {
  await post.findByIdAndRemove(req.params.id);
  res.redirect("/");
};
