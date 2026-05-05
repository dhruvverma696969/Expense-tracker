function ExpenseList({ expenses, onDelete, onEdit }) {

  const sortedExpenses = [...expenses].sort((a, b) => {
  return new Date(b.date) - new Date(a.date);
});

  return (
    <div style={{ maxWidth: "600px", margin: "auto" }}>
      {sortedExpenses.map(exp => {
        
        // ✅ Format date once (cleaner)
        const formattedDate = exp.date
          ? new Date(exp.date).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric"
            })
          : "No date";

        return (
          <div
            key={exp.id}
            style={{
              background: "linear-gradient(135deg, #2c2c2c, #3a3a3a)",
              color: "white",
              padding: "15px 20px",
              margin: "15px 0",
              borderRadius: "20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              boxShadow: "0 4px 12px rgba(0,0,0,0.4)"
            }}
          >
            {/* Left side */}
            <div style={{ fontSize: "18px", fontWeight: "500" }}>
              ₹{exp.amount} — {exp.category}
              <div style={{ fontSize: "12px", opacity: 0.6 }}>
                {formattedDate}
              </div>
            </div>

            {/* Right side (buttons grouped) */}
            <div style={{ display: "flex", gap: "12px" }}>
              
              <button
                onClick={() => onEdit(exp)}
                style={{
                  background: "linear-gradient(135deg, #ff7e5f, #feb47b)",
                  color: "black",
                  padding: "8px 16px",
                  borderRadius: "60px",
                  border: "none",
                  fontWeight: "bold",
                  cursor: "pointer",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.5)"
                }}
              >
                Edit
              </button>

              <button
                onClick={() => onDelete(exp.id)}
                style={{
                  background: "linear-gradient(135deg, #ff416c, #ff4b2b)",
                  color: "black",
                  padding: "8px 16px",
                  borderRadius: "60px",
                  border: "none",
                  fontWeight: "bold",
                  cursor: "pointer",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.5)"
                }}
              >
                Delete
              </button>

            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ExpenseList;