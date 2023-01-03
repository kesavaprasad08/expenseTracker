function saveToLocalStorage(event) {
    event.preventDefault();
    const ExpenseAmt = event.target.ExpenseAmt.value;
    const  Description =event.target.Description.value;
    const expenseList = event.target.expenseList.value;
    const obj = {
        ExpenseAmt,
        Description,
        expenseList
    }
    localStorage.setItem(obj.Description, JSON.stringify(obj))
    showNewExpenseOnScreen(obj)

} 

window.addEventListener("DOMContentLoaded", () => {
    const localStorageObj = localStorage;
    const localStorageKeys  = Object.keys(localStorageObj)

    for(var i =0; i< localStorageKeys.length; i++){
        const key = localStorageKeys[i];
        const ExpenseDetailsString = localStorageObj[key];
        const ExpenseDetailsObj = JSON.parse(ExpenseDetailsString);
        showNewExpenseOnScreen(ExpenseDetailsObj)
    }
})


function showNewExpenseOnScreen(expense){
    document.getElementById('ExpenseAmt').value = '';
    document.getElementById('Description').value = '';
    document.getElementById('expenseList').value ='';
    if(localStorage.getItem(expense.Description) !== null){
        removeExpenseFromScreen(expense.Description);
    }
    const parentNode = document.getElementById('listOfExpenses');
    const childHTML = `<li id=${expense.Description}> ${expense.ExpenseAmt} - ${expense.expenseList} -${expense.Description}
                            <button onclick=deleteExpense('${expense.Description}')> Delete Expense </button>
                            <button onclick=editExpenseDetails('${expense.Description}','${expense.ExpenseAmt}','${expense.expenseList}')>Edit Expense </button>
                        </li>`

    parentNode.innerHTML = parentNode.innerHTML + childHTML;
}

function editExpenseDetails(Description, ExpenseAmt, expenseList){

    document.getElementById('Description').value = Description;
    document.getElementById('ExpenseAmt').value = ExpenseAmt;
    document.getElementById('expenseList').value =expenseList;

    deleteExpense(Description)
}

function deleteExpense(Description){
    console.log(Description)
    localStorage.removeItem(Description);
    removeExpenseFromScreen(Description);

}

function removeExpenseFromScreen(Description){
    const parentNode = document.getElementById('listOfExpenses');
    const childNodeToBeDeleted = document.getElementById(Description);
    if(childNodeToBeDeleted) {
        parentNode.removeChild(childNodeToBeDeleted)
    }
}