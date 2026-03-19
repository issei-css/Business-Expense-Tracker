import {
  collection,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebaseConfig";

// Helper to get expenses collection ref for a user
const expensesRef = (userId) => collection(db, "users", userId, "expenses");

// CREATE a new expense
export async function addExpense(userId, expense) {
  await addDoc(expensesRef(userId), {
    ...expense,
    createdAt: serverTimestamp(),
  });
}

// READ all expenses (real-time listener)
export function subscribeToExpenses(userId, callback) {
  const q = query(expensesRef(userId), orderBy("date", "desc"));
  return onSnapshot(q, (snapshot) => {
    const expenses = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(expenses);
  });
}

// UPDATE an expense
export async function updateExpense(userId, expenseId, data) {
  const expenseDoc = doc(db, "users", userId, "expenses", expenseId);
  await updateDoc(expenseDoc, data);
}

// DELETE an expense
export async function deleteExpense(userId, expenseId) {
  const expenseDoc = doc(db, "users", userId, "expenses", expenseId);
  await deleteDoc(expenseDoc);
}
