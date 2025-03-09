require('dotenv').config();

const mysql = require("mysql2");

const db = mysql.createConnection({
    host: process.env.DB_HOST,       // Fetch from .env
    user: process.env.DB_USER,       // Fetch from .env
    password: process.env.DB_PASSWORD, // Fetch from .env
    database: process.env.DB_NAME    // Fetch from .env
});

db.connect((err) => {
    if (err) {
        console.error("Database connection failed: " + err.stack);
        return;
    }
    console.log("Connected to database");
});

module.exports = db;
