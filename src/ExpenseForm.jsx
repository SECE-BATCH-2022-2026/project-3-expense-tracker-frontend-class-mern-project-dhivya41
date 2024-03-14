import React, { useState } from 'react';

function ExpenseForm({ addForm }) {
    const [expense, setExpense] = useState('');
    const [amount, setAmount] = useState(0);
    const [error, setError] = useState({});

    const handleExpense = (e) => {
        setExpense(e.target.value);
        setError({});
    };

    const handleAmount = (e) => {
        setAmount(e.target.value);
        setError({});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        var err = {};
        if (expense === "" || expense.length < 3) {
            err.expense = "Please enter a valid expense.";
        }
        if (amount === 0) {
            err.amount = "Please enter a valid amount.";
        }
        
        setError(err);

        if (Object.keys(err).length === 0) {
            try {
                const response = await fetch("/addexpense", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ title: expense, amount: amount }),
                });
                if (response.ok) {
                    addForm(expense, amount);
                    setExpense('');
                    setAmount(0);
                } else {
                    const data = await response.json();
                    console.log("Error adding expense:", data.message);
                }
            } catch (error) {
                console.error("Error adding expense:", error);
            }
        }
    };

    return (
        <div>
            <h1 id="h1">Expense Tracker</h1>
            <div id="main">           
                <form onSubmit={handleSubmit}>
                    <div id="chil">
                        <div className='sp'>
                            <div> <label className='label'>Expense:</label></div>
                            <div><input className='input' type="text" placeholder='Enter the expense' value={expense} onChange={handleExpense} /> <br />
                            {error.expense} <br /></div>                
                        </div>
                        <div className='sp'>
                            <div><label className='label'>Amount:</label></div>
                            <div><input className='input' type="number" placeholder="enter the amount" value={amount} onChange={handleAmount} /> <br />
                            {error.amount} <br /></div>             
                        </div>              
                        <button type="submit" id="btn">Add Expense</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ExpenseForm;
