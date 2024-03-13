import { useState } from 'react'
import './App.css'
import ExpenseItem from './ExpenseItem'
import ExpenseForm from './ExpenseForm';

function App() {   
    
    const [transactions, setTransactions] = useState([
        { id: 1, expense: "Food", amount: 1000 },
        { id: 2, expense: "Travel", amount: 1500 },
        { id: 3, expense: "SemFee", amount: 3000 }
    ]);

    function addForm(expense,amount){
        console.log(expense,amount);
        const data={id:transactions.length+1 ,expense:expense,amount:amount}
        setTransactions([...transactions,data])
        console.log([...transactions,data])
    }
    function handleRemove(index){
        const arr = [...transactions];
        arr.splice(index, 1);
        setTransactions(arr);
    }

    return (
        <div>
             <ExpenseForm addForm={addForm}/>
            {transactions.map((value,index)=>(
               <ExpenseItem  id={value.id} 
               expense={value.expense} 
               amount={value.amount}
               key={value.id}
               handleRemove={() => handleRemove(index)} />
            ))} <br />
            <div id="total">
                Total Expense: ${transactions.reduce((total, transaction) =>
                total + parseFloat(transaction.amount), 0)}
             </div>
          
        </div>
        
    )
}

export default App
