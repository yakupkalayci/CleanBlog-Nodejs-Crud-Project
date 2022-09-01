const express = require("express");
const mongoose = require("mongoose");
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

//TEMPLATE ENGINE
app.set("view engine", "ejs");  

//ROUTES
app.get("/", async (req, res) => {
    const posts = await post.find({});
    res.render("index", {
        posts
    });
});

app.get("/about", (req, res) => {
    res.render("about");
});

app.get("/add_post", (req, res) => {
    res.render("add_post");
});

app.get("/post", (req, res) => {
    res.render("post");
});

app.post("/blogPost", async (req, res) => {
    await post.create(req.body);
    res.redirect("/");
});


const port = 3000;

app.listen(3000, () => console.log(`Sunucu ${port} portunda çalıştı.`));