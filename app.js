const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const path = require("path");
const ejs = require("ejs");

const postController = require("./controllers/postControllers");
const pageControllers = require("./controllers/pageControllers");

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
app.get("/", postController.getAllPosts);
app.get("/posts/:id", postController.getPost);
app.post("/blogPost", postController.createPost);
app.put("/posts/:id", postController.updatePost);
app.delete("/posts/:id", postController.deletePost);

app.get("/about", pageControllers.getAboutPage);
app.get("/add_post", pageControllers.getAboutPage);
app.get("/posts/edit/:id", pageControllers.getEditPage);



const port = 3000;

app.listen(3000, () => console.log(`Sunucu ${port} portunda çalıştı.`));