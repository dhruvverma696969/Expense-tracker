const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./db");

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




app.get("/expenses", (req, res) => {
  db.query("SELECT * FROM expenses", (err, result) => {
    if (err) {
      console.log(err);
      return res.send("Error fetching ❌");
    }
    res.json(result);
  });
});



app.post("/expenses", (req, res) => {
  const { amount, category,date } = req.body;

  const sql = "INSERT INTO expenses (amount, category,date) VALUES (?, ?, ?)";

  db.query(sql, [amount,category,date], (err, result) => {
    if (err) {
      console.log(err);
      return res.send("Error adding expense ❌");
    }

    res.send("Expense added ✅");
  });
});



app.delete("/expenses/:id", (req, res) => {
  const id = Number(req.params.id); // ensure number

  db.query("DELETE FROM expenses WHERE id = ?", [id], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Error deleting ❌" });
    }

    res.json({ message: "Deleted ✅" });
  });
});



app.put("/expenses/:id", (req, res) => {
  const id = req.params.id;
  const { amount, category,date } = req.body;

  const sql = "UPDATE expenses SET amount = ?, category = ?, date = ? WHERE id = ?";

  db.query(sql, [amount, category,date, id], (err, result) => {
    if (err) {
      console.log(err);
      return res.send("Error updating ❌");
    }

    res.send("Updated ✅");
  });
});



app.listen(5000, () => {
  console.log("Server running on port 5000");
});
