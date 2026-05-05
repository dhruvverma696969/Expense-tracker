import { useState, useEffect } from "react";

function EditExpense({ expense, onSave, onClose }) {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const today = new Date();
  const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
    .toISOString()
    .split("T")[0];

  const [date, setdate] = useState(localDate);

  // Pre-fill when expense changes
  useEffect(() => {
    if (expense) {
      setAmount(expense.amount);
      setCategory(expense.category);
      setdate(expense.date);
    }
  }, [expense]);

  function handleSubmit(e) {
    e.preventDefault();

    const updatedExpense = {
      ...expense,
      amount,
      category,
      date
    };

    onSave(updatedExpense);
  }

  return (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(0,0,0,0.6)",
      backdropFilter: "blur(8px)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000
    }}
  >
    <div
      style={{
        background: "#1f1f1f",
        padding: "25px",
        borderRadius: "16px",
        width: "350px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.6)",
        display: "flex",
        flexDirection: "column",
        gap: "15px"
      }}
    >
      <h2
        style={{
          margin: 0,
          textAlign: "center",
          color: "white"
        }}
      >
        Edit Expense
      </h2>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "12px" }}
      >
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "none",
            outline: "none",
            background: "#2c2c2c",
            color: "white"
          }}
        />

        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category"
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "none",
            outline: "none",
            background: "#2c2c2c",
            color: "white"
          }}
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setdate(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "none",
            outline: "none",
            background: "#2c2c2c",
            color: "white"
          }}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "10px"
          }}
        >
          <button
            type="submit"
            style={{
              flex: 1,
              marginRight: "10px",
              padding: "10px",
              borderRadius: "8px",
              border: "none",
              background: "linear-gradient(135deg, #00c6ff, #0072ff)",
              color: "white",
              fontWeight: "bold",
              cursor: "pointer",
              boxShadow: "0 4px 10px rgba(0,0,0,0.4)",
            }}
          >
            Save
          </button>

          <button
            type="button"
            onClick={onClose}
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "8px",
              border: "none",
              background: "linear-gradient(135deg, #ff6a00, #ff0000)",
              color: "white",
              fontWeight: "bold",
              cursor: "pointer",
              
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
);
}

export default EditExpense;