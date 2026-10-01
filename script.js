const transactionFilter = document.querySelectorAll('.transaction-filter button');
const totalBalance = document.querySelector('.total-balance .balance');
const incomingBalance = document.querySelector('.income-balance .in-balance');
const expenseBalance = document.querySelector('.expense-balance .out-balance');
const addTransaction = document.querySelector('.add-transaction');
const newTransactionForm = document.querySelector('.new-transaction')

const rupiah = "Rp"

transactionFilter.forEach(button => {
    button.addEventListener('click', function() {
        // menjadikan elemen untuk filter jadi interactive 
        transactionFilter.forEach(button => button.classList.remove('active'))
        this.classList.add('active');
    });
});

addTransaction.addEventListener('click', function() {
    newTransactionForm.classList.add('active');
    const backTrigger = document.querySelector('.back-trigger');
    backTrigger.addEventListener('click', function() {
        newTransactionForm.classList.remove('active');
    });
});



