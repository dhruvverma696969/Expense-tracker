const db = require("../config/db");




const getExpenses = (req, res) => {
  const userId = req.user;

  db.query("SELECT * FROM expenses WHERE UserId=?",[userId],(err, result) => {
    if (err) {
      console.log(err);
      return res.send("Error fetching ❌");
    }

    res.json(result);
  });
};



const addExpense = (req, res) => {
  const { amount, category, date } = req.body;
  const userId = req.user;

  const sql =
    "INSERT INTO expenses (amount, category, date,UserId) VALUES (?, ?, ?, ?)";

  db.query(sql, [amount, category, date,userId], (err, result) => {
    if (err) {
      console.log(err);
      return res.send("Error adding expense ❌");
    }

    res.send("Expense added ✅");
  });
};




const deleteExpense = (req, res) => {
  const id = Number(req.params.id);

  db.query(
    "DELETE FROM expenses WHERE id = ?",
    [id],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          message: "Error deleting ❌",
        });
      }

      res.json({
        message: "Deleted ✅",
      });
    }
  );
};




const updateExpense = (req, res) => {
  const id = req.params.id;

  const { amount, category, date } = req.body;

  const sql =
    "UPDATE expenses SET amount = ?, category = ?, date = ? WHERE id = ?";

  db.query(
    sql,
    [amount, category, date, id],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.send("Error updating ❌");
      }

      res.send("Updated ✅");
    }
  );
};



module.exports = {
  getExpenses,
  addExpense,
  deleteExpense,
  updateExpense,
};