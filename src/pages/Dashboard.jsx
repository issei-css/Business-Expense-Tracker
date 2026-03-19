import { useEffect, useState } from "react";
import { auth } from "../firebase/firebaseConfig";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { subscribeToExpenses } from "../firebase/expensesService";
import AddExpenseForm from "../components/AddExpenseForm";
import ExpenseList from "../components/ExpenseList";
import SummaryCards from "../components/SummaryCards";
import ExpenseChart from "../components/ExpenseCharts";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Dashboard() {
  const { currentUser } = useAuth();
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = subscribeToExpenses(currentUser.uid, (data) => {
      setExpenses(data);
      setLoading(false);
    });
    return unsubscribe;
  }, [currentUser]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <div className="bg-white border-b px-6 py-4 flex justify-between items-center sticky top-0 z-10 shadow-sm">
        <h1 className="text-xl font-bold">💼 Expense Tracker</h1>
        <div className="flex items-center gap-4">
          <p className="text-sm text-gray-400 hidden sm:block">
            {currentUser.email}
          </p>
          <button
            onClick={handleLogout}
            className="text-sm text-red-500 hover:underline"
          >
            Log Out
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-5xl mx-auto px-4 py-8 flex flex-col gap-6">
        {loading ? (
          <LoadingSpinner message="Loading your expenses..." />
        ) : (
          <>
            <SummaryCards expenses={expenses} />
            <ExpenseChart expenses={expenses} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AddExpenseForm />
              <ExpenseList />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
