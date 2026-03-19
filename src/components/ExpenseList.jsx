import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { subscribeToExpenses } from "../firebase/expensesService";
import ExpenseItem from "./ExpenseItem";
import LoadingSpinner from "./LoadingSpinner";
import EmptyState from "./EmptyState";
import { CATEGORIES } from "../constants/categories";

export default function ExpenseList() {
  const { currentUser } = useAuth();
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const unsubscribe = subscribeToExpenses(currentUser.uid, (data) => {
      setExpenses(data);
      setLoading(false);
    });
    return unsubscribe;
  }, [currentUser]);

  const filtered =
    filter === "All" ? expenses : expenses.filter((e) => e.category === filter);

  return (
    <div className="bg-white rounded-2xl shadow-sm border">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-bold">Expenses</h2>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          <option value="All">All Categories</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Content */}
      {loading ? (
        <LoadingSpinner message="Fetching expenses..." />
      ) : filtered.length === 0 ? (
        <EmptyState
          icon="🧾"
          message="No expenses found."
          sub={
            filter !== "All"
              ? `No entries under "${filter}"`
              : "Add your first expense above!"
          }
        />
      ) : (
        filtered.map((expense) => (
          <ExpenseItem key={expense.id} expense={expense} />
        ))
      )}

      {/* Footer total */}
      {!loading && filtered.length > 0 && (
        <div className="flex justify-between items-center px-4 py-3 border-t bg-gray-50 rounded-b-2xl">
          <p className="text-sm text-gray-500">
            {filtered.length} expense{filtered.length !== 1 ? "s" : ""}
          </p>
          <p className="text-sm font-bold">
            Total: ₱{filtered.reduce((sum, e) => sum + e.amount, 0).toFixed(2)}
          </p>
        </div>
      )}
    </div>
  );
}
