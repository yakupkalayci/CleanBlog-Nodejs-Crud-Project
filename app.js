const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const path = require("path");
const ejs = require("ejs");

const post = require("./models/Post");

const app = express();

// connect DB
mongoose.connect("mongodb://localhost:/cleanblogDB");

//MIDDLEWARES
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(methodOverride("_method", {
    methods: ["GET", "POST"]
}));

//TEMPLATE ENGINE
app.set("view engine", "ejs");  

//ROUTES
app.get("/", async (req, res) => {
    const posts = await post.find({});
    res.render("index", {
        posts
    });
});

app.get("/posts/:id", async (req, res) => {
    const Post = await post.findById(req.params.id);
    res.render("post", {
        Post
    })
});

app.get("/about", (req, res) => {
    res.render("about");
});

app.get("/add_post", (req, res) => {
    res.render("add_post");
});

app.post("/blogPost", async (req, res) => {
    await post.create(req.body);
    res.redirect("/");
});

app.get("/posts/edit/:id", async(req, res) => {
    const Post = await post.findById(req.params.id);
    res.render("edit_post", {
        Post
    });
});

app.put("/posts/:id", async (req, res) => {
    const Post = await post.findById(req.params.id);
    Post.title = req.body.title;
    Post.subTitle = req.body.subTitle;
    Post.author = req.body.author;
    Post.article = req.body.article;
    Post.save();

    res.redirect(`/posts/${Post.id}`);

});



const port = 3000;

app.listen(3000, () => console.log(`Sunucu ${port} portunda çalıştı.`));