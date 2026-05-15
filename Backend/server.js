const express = require("express");
const cors = require("cors");

require("dotenv").config();

const db = require("./config/db");

const expenseRoutes = require("./routes/expenseRoutes");

const app = express();

app.use(cors());
app.use(express.json());



app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});



app.get("/test-db", (req, res) => {
  db.query("SELECT 1", (err, result) => {
    if (err) {
      console.log(err);
      return res.send("DB error ❌");
    }

    res.send("DB connected ✅");
  });
});



app.use("/expenses", expenseRoutes);



app.listen(5000, () => {
  console.log("Server running on port 5000");
});