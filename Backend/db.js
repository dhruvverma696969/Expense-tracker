const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.DB_PASSWORD,
  database: "test_db"
});

db.connect((err) => {
  if (err) {
    console.log("DB connection error:", err);
  } else {
    console.log("Connected to MySQL ✅");
  }
});

module.exports = db;