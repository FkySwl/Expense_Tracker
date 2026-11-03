
// elemen selected by DOM
const transactionFilter = document.querySelectorAll('.transaction-filter button');
const totalBalance = document.querySelector('.total-balance .balance');
const incomingBalance = document.querySelector('.income-balance .in-balance');
const expenseBalance = document.querySelector('.expense-balance .out-balance');
const addTransaction = document.querySelector('.add-transaction');
const newTransactionForm = document.querySelector('.new-transaction');
const backTrigger = document.querySelector('.back-trigger');
const addNewTransaction = document.querySelector('.add-new-transaction');
const transactionType = document.getElementById('transaction-type');
const incomeType = document.getElementById('income-type');
const expenseType = document.getElementById('expense-type');

// transaction-list place
const transactions = JSON.parse(localStorage.getItem('transactions')) ?? [];

// render balance and transactions
renderBalance(transactions);
renderTransactions(transactions);

// give click event to transaction filter to filter list of transactions
transactionFilter.forEach(button => {
    button.addEventListener('click', function() {
        // menjadikan elemen untuk filter jadi interactive 
        transactionFilter.forEach(button => button.classList.remove('active'));
        this.classList.add('active');
        if (this.classList.contains('active') && this.textContent == "Income") {
            const incomeTransactions = transactions.filter(item => item.transactionType == 'Income');
            renderTransactions(incomeTransactions);
        } else if (this.classList.contains('active') && this.textContent == "Expense") {
            const expenseTransactions = transactions.filter(item => item.transactionType == 'Expense');
            renderTransactions(expenseTransactions);
        } else {
            renderTransactions(transactions);
        }
    });
});

// jangan menggunakan nested event(event di dalam event) untuk memberikan event ke element html yang sudah ada karena akan membuat penumpukan event untuk element yang di buat dengan html, bukan dengan create element di js

// give click event to show new transactions form input
addTransaction.addEventListener('click', function() {
    newTransactionForm.classList.toggle('active');
});

// add click event to back to menu when click area except the form
backTrigger.addEventListener('click', function backToMenu() {
    newTransactionForm.classList.toggle('active');
});

// give change event for transaction type options
transactionType.addEventListener('change', function() {
    if (transactionType.value == 'Income') {
        incomeType.classList.add('active');
        expenseType.classList.remove('active');
    } else if (transactionType.value == 'Expense') {
        expenseType.classList.add('active');
        incomeType.classList.remove('active');
    }
});

// give click event to add new transaction to local storage
addNewTransaction.addEventListener('click', function() {
    const description = document.getElementById('transaction-desc');
    const totalMoney = document.getElementById('total-money');
    const dateInput = document.getElementById('date');
    if (description.value.length > 0 && totalMoney.value.length > 0 && transactionType.value != "Transaction Type" && dateInput.value.length > 0 && (incomeType.value != "Income Type" || expenseType.value != "Expense Type")) {
        const newTransaction = {
            description : description.value,
            amount : Number(totalMoney.value),
            date : date.value.replaceAll('-', ' '),
            transactionType : transactionType.value,
            type : transactionType.value == "Income" ? incomeType.value : expenseType.value,   
        } 

        transactions.push(newTransaction);
        localStorage.setItem(
            'transactions',
            JSON.stringify(transactions)
        );

        description.value = '', totalMoney.value = '', dateInput.value = '', transactionType.value = "Transaction Type", incomeType.value = "Income Type", expenseType.value = "Expense Type";
        newTransactionForm.classList.toggle('active');
        incomeType.classList.remove('active')
        expenseType.classList.remove('active')
        
        renderBalance(transactions);
        renderTransactions(transactions);

    } else {
        alert("Harap Masukkan Informasi Yang Lengkap");
    }

});

// render balance function
function renderBalance(elements) {
    let balance = 0;
    let inBalance = 0;  
    let outBalance = 0;
    
    elements.forEach(item => {
        if (item.transactionType == "Income") {
            balance += item.amount;
            inBalance += item.amount;
        } else if (item.transactionType == "Expense" && balance > 0) {
            balance -= item.amount;
            outBalance += item.amount;
        }
    });
    
    // console.log(inBalance);
    // console.log(outBalance);

    totalBalance.textContent = `Rp${balance.toLocaleString('id-ID')}`;
    incomingBalance.textContent = `+Rp${inBalance.toLocaleString('id-ID')}`;
    expenseBalance.textContent = `-Rp${outBalance.toLocaleString('id-ID')}`;

    // toLocalString akan memgonversi angka otomatis memformat angka sesuai dengan pengaturan browser, kalau mau costum tinggal di isi dengan argumen negara yang dituju, seperti indonesia (id-ID) yang pemisah ribuannya adalah titik, atau amerika (en-US) yang pemisah ribuannya adalah koma
    
    // atau kalau mau yang penggunaan performanya lebih sedikti bisa menggunakan yang lebih disarankan yaitu 
    // Intl.NumberFormat(angka yang mau diformat) lebih lengkapnya silahkan searching 
}

// render transaction functions
function renderTransactions(items) {
    const transactionLists = document.querySelector('.list-transactions');
    transactionLists.innerHTML = '';
    
    items?.forEach((item, index)=> {
        const newTransactionList = document.createElement('section');
        newTransactionList.classList.add('transaction');
    
        const newDesc = document.createElement('p');
        newDesc.classList.add('text');
        newDesc.textContent = item.description;
    
        const newBalance = document.createElement('p');
        newBalance.classList.add('balance');
        newBalance.textContent = item.transactionType == "Income" ? `+Rp${item.amount.toLocaleString('id-ID')}` : `-Rp${item.amount.toLocaleString('id-ID')}`;
    
        const newDate = document.createElement('p');
        newDate.classList.add('date');
        newDate.textContent = item.date;
    
        const newDelButton = document.createElement('button');
        newDelButton.setAttribute('type', 'button');
        newDelButton.textContent = 'D';
        newDelButton.addEventListener('click', function() {
            items.splice(index, 1);
            localStorage.setItem(
                'transactions',
                JSON.stringify(items)
            );
            newTransactionList.remove();
            renderBalance(items)
        });
        
        newTransactionList.appendChild(newDesc);
        newTransactionList.appendChild(newBalance);
        newTransactionList.appendChild(newDate);
        newTransactionList.appendChild(newDelButton);
        
        transactionLists.appendChild(newTransactionList);
    });
    
}

