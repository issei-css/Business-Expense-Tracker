import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { deleteExpense } from "../firebase/expensesService";

const CATEGORY_COLORS = {
  Travel: "bg-blue-100 text-blue-700",
  "Food & Dining": "bg-orange-100 text-orange-700",
  "Office Supplies": "bg-yellow-100 text-yellow-700",
  "Software & Tools": "bg-purple-100 text-purple-700",
  Marketing: "bg-pink-100 text-pink-700",
  Utilities: "bg-gray-100 text-gray-700",
  Entertainment: "bg-red-100 text-red-700",
  Other: "bg-teal-100 text-teal-700",
};

export default function ExpenseItem({ expense }) {
  const { currentUser } = useAuth();
  const [deleting, setDeleting] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleDelete = async () => {
    if (!confirmDelete) {
      setConfirmDelete(true);
      setTimeout(() => setConfirmDelete(false), 3000);
      return;
    }
    setDeleting(true);
    await deleteExpense(currentUser.uid, expense.id);
  };

  return (
    <div
      className={`flex items-center justify-between p-4 border-b last:border-b-0 hover:bg-gray-50 transition group ${deleting ? "opacity-40 pointer-events-none" : ""}`}
    >
      <div className="flex items-center gap-3">
        <div>
          <p className="text-sm font-semibold">{expense.description}</p>
          <p className="text-xs text-gray-400">{expense.date}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span
          className={`text-xs font-medium px-2 py-1 rounded-full ${CATEGORY_COLORS[expense.category] || "bg-gray-100 text-gray-700"}`}
        >
          {expense.category}
        </span>
        <p className="text-sm font-bold text-gray-800 min-w-[80px] text-right">
          ₱{expense.amount.toFixed(2)}
        </p>
        <button
          onClick={handleDelete}
          className={`text-xs transition opacity-0 group-hover:opacity-100 px-2 py-1 rounded-lg font-medium ${
            confirmDelete
              ? "bg-red-500 text-white opacity-100"
              : "text-gray-300 hover:text-red-500"
          }`}
        >
          {confirmDelete ? "Confirm?" : "✕"}
        </button>
      </div>
    </div>
  );
}
