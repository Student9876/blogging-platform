const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

const corsOptions = {
    origin: "http://localhost:3000", // your frontend URL
    credentials: true, // allow cookies and Authorization header
};

app.use(cors(corsOptions));

app.use(express.json());

// Routes
const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/posts");

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(5000, () => console.log("Server running on http://localhost:5000"));
    })
    .catch(err => console.error(err));
