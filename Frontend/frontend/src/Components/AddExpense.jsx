import { useState } from "react";

function AddExpense({ onAdd }) {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  const today = new Date();
  const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
    .toISOString()
    .split("T")[0];

  const [date, setdate] = useState(localDate);


  function handleSubmit(e) {
    e.preventDefault();

    const newExpense = {
      amount,
      category,
      date
    };

    onAdd(newExpense);

    // clear inputs
    setAmount("");
    setCategory("");
    setdate(localDate);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number" required
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <input
        type="text" required
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <input
        type="date" required
        
        value={date}
        onChange={(e) => setdate(e.target.value)}
      />

      <button type="submit">Add Expense</button>
    </form>
  );
}

export default AddExpense;