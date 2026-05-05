import { useEffect, useState } from "react";
import AddExpense from "./Components/AddExpense";
import ExpenseList from "./Components/ExpenseList.jsx";
import EditExpense from "./Components/EditExpense.jsx";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");



  useEffect(() => {
    fetch("http://localhost:5000/expenses")
      .then(res => res.json())
      .then(data => setExpenses(data));
  }, []);


  function addExpense(expense) {
    fetch("http://localhost:5000/expenses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(expense)
    })
      .then(() => {
        return fetch("http://localhost:5000/expenses");
      })
      .then(res => res.json())
      .then(data => setExpenses(data));
  }

  //--DELETE---
  function handleDelete(id) {
    fetch(`http://localhost:5000/expenses/${id}`, {
      method: "DELETE"
    }).then(() => {
      setExpenses(prev => prev.filter(exp => exp.id !== id));
    });
  }


  //----UPDATE__PART---
  function handleEdit(exp) {
    setEditingExpense(exp);
    setIsEditing(true);
  }

  function handleUpdate(updatedExpense) {
    fetch(`http://localhost:5000/expenses/${updatedExpense.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedExpense)
    })
      .then(() => fetch("http://localhost:5000/expenses"))
      .then(res => res.json())
      .then(data => {
        setExpenses(data);
        setIsEditing(false); // close popup
      });
  }

  // -------FILTERING PART------//

  const term = searchTerm.trim().toLowerCase();

  const filteredExpenses = expenses.filter((exp) => {

    if (!term) return true; // show all when empty

    return exp.category.toLowerCase().includes(term);
  });


  //---total--

  const total = filteredExpenses.reduce((sum, exp) => {
    return sum + Number(exp.amount);
  }, 0);




  return (
    <div>
      <h1>Expense Tracker</h1>

      <AddExpense onAdd={addExpense} />

      <div style={{
        position: "relative",
        width: "60%",
        margin: "20px auto"
      }}>

        <input
          type="text"
          placeholder="🔍 Search category (e.g. food, travel...)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "12px 40px 12px 16px", // extra right padding for button
            width: "100%",
            borderRadius: "25px",
            border: "1px solid #ddd",
            outline: "none",
            fontSize: "16px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
          }}
        />

        {searchTerm && (
          <span
            onClick={() => setSearchTerm("")}
            style={{
              position: "absolute",
              right: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              cursor: "pointer",
              fontSize: "18px",
              color: "#888",
              fontWeight: "bold"
            }}
          >
            ✖
          </span>
        )}

      </div>

      {filteredExpenses.length === 0 ? (
        <h2
          style={{
            textAlign: "center",
            marginTop: "30px",
            marginBottom: "30px",
            color: "#ff4b2b",
            fontWeight: "bold"
          }}
        >
          No results for "{searchTerm}"
        </h2>
      ) : (
        <ExpenseList expenses={filteredExpenses} onDelete={handleDelete} onEdit={handleEdit} />
      )}



      {isEditing && (
        <EditExpense
          expense={editingExpense}
          onSave={handleUpdate}
          onClose={() => setIsEditing(false)}
        />
      )}

      <div style={{
        background: "#F5DEB3", // Solid Wheat for that clean look in your image
        padding: "16px 24px",  // Reduced padding for a slimmer profile
        borderRadius: "16px",
        boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
        maxWidth: "320px",     // Narrowed width to match the item cards better
        margin: "25px auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        border: "1px solid rgba(0,0,0,0.05)"
      }}>
        {/* Accent Line - made thinner and shorter */}
        <div style={{
          width: "30px",
          height: "3px",
          backgroundColor: "#D4AF37",
          borderRadius: "2px",
          marginBottom: "10px"
        }}></div>

        <span style={{
          color: "#8B7355",
          textTransform: "uppercase",
          letterSpacing: "1.5px",
          fontSize: "0.65rem", // Scaled down label
          fontWeight: "700"
        }}>
          GRAND TOTAL
        </span>

        <h2 style={{
          textAlign: "center",
          marginTop: "6px",
          marginBottom: "0",
          color: "#2C2C2C",    // High contrast dark grey/brown
          fontWeight: "800",
          fontSize: "1.8rem",  // Reduced from 2.5rem for better proportions
          fontFamily: "inherit"
        }}>
          ₹{total.toLocaleString('en-IN')}
        </h2>
      </div>



    </div>
  );
}

export default App;