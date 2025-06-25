const express = require("express");
const Post = require("../models/Post");
const jwt = require("jsonwebtoken");

const router = express.Router();

const User = require("../models/User");

// Middleware to protect routes
function auth(req, res, next) {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(403).json("Unauthorized");
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(401).json("Invalid token");
        req.user = user;
        next();
    });
}

// Create Post
router.post("/", auth, async (req, res) => {
    const post = new Post({ ...req.body, author: req.user.id });
    await post.save();
    res.status(201).json(post);
});

// Get All Posts
router.get("/", async (req, res) => {
    const search = req.query.search;
    const posts = await Post.find(
        search ? { title: { $regex: search, $options: "i" } } : {}
    ).populate("author", "username");
    res.json(posts);
});

// Get Single Post
router.get("/:id", async (req, res) => {
    const post = await Post.findById(req.params.id).populate("author", "username");
    res.json(post);
});

// Add Comment
router.post("/:id/comment", auth, async (req, res) => {
    try {
        const { text } = req.body;
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: "Post not found" });

        const user = await User.findById(req.user.id);

        const comment = {
            text,
            user: req.user.id,
            username: user.username,
            createdAt: new Date()
        };

        post.comments.push(comment);
        await post.save();

        res.status(200).json({ message: "Comment added", comment });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
