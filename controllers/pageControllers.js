const post = require("../models/Post");

exports.getAboutPage = (req, res) => {
  res.render("about");
};

exports.getAboutPage = (req, res) => {
  res.render("add_post");
};

exports.getEditPage = async (req, res) => {
  const Post = await post.findById(req.params.id);
  res.render("edit_post", {
    Post,
  });
};
