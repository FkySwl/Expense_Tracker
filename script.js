const transactionFilter = document.querySelectorAll('.transaction-filter button');
const totalBalance = document.querySelector('.total-balance .balance');
const incomingBalance = document.querySelector('.income-balance .in-balance');
const expenseBalance = document.querySelector('.expense-balance .out-balance');
const addTransaction = document.querySelector('.add-transaction');

const transactions = JSON.parse(localStorage.getItem('transactions')) ?? [];

transactionFilter.forEach(button => {
    button.addEventListener('click', function() {
        // menjadikan elemen untuk filter jadi interactive 
        transactionFilter.forEach(button => button.classList.remove('active'));
        this.classList.add('active');
    });
});

addTransaction.addEventListener('click', function() {
    const newTransactionForm = document.querySelector('.new-transaction');
    newTransactionForm.classList.add('active');
    const backTrigger = document.querySelector('.back-trigger');
    backTrigger.addEventListener('click', function() {
        newTransactionForm.classList.remove('active');
    });

    const transactionType = document.getElementById('transaction-type');
    const incomeType = document.getElementById('income-type');
    const expenseType = document.getElementById('expense-type');
    transactionType.addEventListener('change', function() {
        if (transactionType.value == 'Income') {
            incomeType.classList.add('active');
            expenseType.classList.remove('active');
        } else if (transactionType.value == 'Expense') {
            expenseType.classList.add('active');
            incomeType.classList.remove('active');
        }
    });

    const addNewTransaction = document.querySelector('.add-new-transaction');
    addNewTransaction.addEventListener('click', function() {
        const description = document.getElementById('transaction-desc');
        const totalMoney = document.getElementById('total-money');
        if (description.value.length > 0 && totalMoney.value.length > 0 && transactionType.value != "Transaction Type" && (incomeType.value != "Income Type" || expenseType.value != "Expense Type")) {
            const newTransaction = {
                description : description.value,
                money : totalMoney.value,
                transactionType : transactionType.value,
                type : transactionType.value == "Income" ? incomeType.value : expenseType.value,   
            } 
    
            transactions.push(newTransaction);
            localStorage.setItem(
                'transactions',
                JSON.stringify(transactions)
            );

            description.value = '', totalMoney.value = '', transactionType.value = "Transaction Type", incomeType.value = "Income Type", expenseType.value = "Expense Type";
            newTransactionForm.classList.remove('active');
        } else {
            // alert("Harap Masukkan Informasi Yang Lengkap");
        }

    });
});



