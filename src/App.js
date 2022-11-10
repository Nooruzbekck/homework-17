import "./App.css";
import { useEffect } from "react";
import Expenses from "./components/Expenses/Expenses";
import NewExpense from "./components/NewExpense/NewExpense";
import { useState } from "react";

function App() {
  const [newExpenses, setNewExpenses] = useState([]);

  const getExpenses = async () => {
    try {
      const response = await fetch(
        "https://expense-tracker-b3366-default-rtdb.europe-west1.firebasedatabase.app/expenses.json"
      );
      const expenses = await response.json();
      const expenseFromServer = [];
      for (const key in expenses) {
        expenseFromServer.push({
          id: key,
          title: expenses[key].title,
          amount: expenses[key].amount,
          date: new Date(expenses[key].date),
        });
      }
      setNewExpenses(expenseFromServer);
    } catch (error) {
      // toastify
    }
  };
  const addExpense = async (newExpense) => {
    try {
      const response = await fetch(
        "https://expense-tracker-b3366-default-rtdb.europe-west1.firebasedatabase.app/expenses.json",
        {
          method: "POST",
          body: JSON.stringify(newExpense),
          headers: { "Content-type": "Application/json" },
        }
      );
      console.log(response);
      getExpenses();
    } catch (error) {
      // toastify
    }
  };

  useEffect(() => {
    getExpenses();
  }, []);
  return (
    <div className="App">
      <NewExpense onAddExpense={addExpense} />
      {newExpenses.length === 0 ? (
        <p>No expenses</p>
      ) : (
        <Expenses expenses={newExpenses} />
      )}
      {/* <ToastContainer /> */}
    </div>
  );
}

export default App;
