const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(express.json()); // Middleware to parse JSON data
app.use(cors()); // Allow frontend requests

// Connect to MySQL Database
const db = mysql.createConnection({
    host: "localhost",
    user: "root", // Your MySQL username
    password: "data@123", // Your MySQL password
    database: "mywebsite_db", // Change to your actual DB name
});

db.connect((err) => {
    if (err) {
        console.error("Database connection failed: " + err.stack);
        return;
    }
    console.log("Connected to database");
});

// API to add a story to MySQL
app.post("/add-story", (req, res) => {
    const { story } = req.body;
    if (!story) {
        return res.status(400).json({ error: "Story is required" });
    }

    const sql = "INSERT INTO stories (story_text) VALUES (?)";
    db.query(sql, [story], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ message: "Story submitted successfully!" });
    });
});

// Start server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});
