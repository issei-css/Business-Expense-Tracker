import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { addExpense } from "../firebase/expensesService";
import { CATEGORIES } from "../constants/categories";

export default function AddExpenseForm() {
  const { currentUser } = useAuth();
  const [form, setForm] = useState({
    description: "",
    amount: "",
    category: CATEGORIES[0],
    date: new Date().toISOString().split("T")[0],
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addExpense(currentUser.uid, {
        ...form,
        amount: parseFloat(form.amount),
      });
      setForm({
        description: "",
        amount: "",
        category: CATEGORIES[0],
        date: new Date().toISOString().split("T")[0],
      });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border p-6">
      <h2 className="text-lg font-bold mb-4">Add Expense</h2>

      {success && (
        <p className="text-green-500 text-sm mb-3">
          Expense added successfully!
        </p>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          name="description"
          placeholder="Description (e.g. Flight to Manila)"
          value={form.description}
          onChange={handleChange}
          className="border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
          required
        />

        <div className="flex gap-3">
          <input
            type="number"
            name="amount"
            placeholder="Amount (₱)"
            value={form.amount}
            onChange={handleChange}
            className="border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 w-1/2"
            min="0"
            step="0.01"
            required
          />
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 w-1/2"
            required
          />
        </div>

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <button
          type="submit"
          disabled={loading}
          className="bg-green-500 text-white rounded-lg py-2 font-semibold hover:bg-green-600 transition disabled:opacity-50"
        >
          {loading ? "Adding..." : "Add Expense"}
        </button>
      </form>
    </div>
  );
}
