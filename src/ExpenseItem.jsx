import React from "react";


function ExpenseItem(props) {
    const { id, expense, amount, handleRemove } = props;

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div className="expense-item" id="prop">
            <div className="expense-label">Expense:</div>
            <div className="expense-value">{expense}</div>
            <div className="amount-label">Amount:</div>
            <div className="amount-value">{amount}</div>
            <div className="remove-button">
                <form onSubmit={handleSubmit}>
                <button type="button" onClick={handleRemove}>Remove</button>
                </form>
            </div>
        </div>
    );
}

export default ExpenseItem;
