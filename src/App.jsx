
import React, { useState, useEffect } from "react";
import ExpenseItem from "./ExpenseItem";
import ExpenseForm from "./ExpenseForm";

function App() {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        fetchExpenses();
    }, []);

    const fetchExpenses = async () => {
        try {
            const response = await fetch("/getexpenses");
            if (response.ok) {
                const data = await response.json();
                setTransactions(data);
            } else {
                console.log("Error fetching expenses:", response.statusText);
            }
        } catch (error) {
            console.error("Error fetching expenses:", error);
        }
    };

    const addForm = (expense, amount) => {
        setTransactions([...transactions, { title: expense, amount: amount }]);
    };

    const handleRemove = async (index) => {
        const id = transactions[index]._id;
        try {
            const response = await fetch(`/deleteexpense/${id}`, {
                method: "DELETE",
            });
            if (response.ok) {
                const updatedTransactions = [...transactions];
                updatedTransactions.splice(index, 1);
                setTransactions(updatedTransactions);
            } else {
                console.log("Error deleting expense:", response.statusText);
            }
        } catch (error) {
            console.error("Error deleting expense:", error);
        }
    };

    return (
        <div>
            <ExpenseForm addForm={addForm} />
            {transactions.map((transaction, index) => (
                <ExpenseItem
                    key={transaction._id}
                    id={transaction._id}
                    expense={transaction.title}
                    amount={transaction.amount}
                    handleRemove={() => handleRemove(index)}
                />
            ))}
            <div id="total">
                Total Expense: $
                {transactions.reduce((total, transaction) => total + parseFloat(transaction.amount), 0)}
            </div>
        </div>
    );
}

export default App;
