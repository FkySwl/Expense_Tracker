const transactionFilter = document.querySelectorAll('.transaction-filter button');
const totalBalance = document.querySelector('.total-balance .balance');
const incomingBalance = document.querySelector('.income-balance .in-balance');
const expenseBalance = document.querySelector('.expense-balance .out-balance');
const addTransaction = document.querySelector('.add-transaction');

const transactions = JSON.parse(localStorage.getItem('transactions')) ?? [];

renderBalance(transactions);
renderTransactions(transactions);

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

addTransaction.addEventListener('click', function() {
    const newTransactionForm = document.querySelector('.new-transaction');
    newTransactionForm.classList.add('active');
    const backTrigger = document.querySelector('.back-trigger');
    // backTrigger.addEventListener('click', function() {
    //     newTransactionForm.classList.remove('active');
    // });

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
        const dateInput = document.getElementById('date');
        if (description.value.length > 0 && totalMoney.value.length > 0 && transactionType.value != "Transaction Type" && dateInput.value.length > 0 && (incomeType.value != "Income Type" || expenseType.value != "Expense Type")) {
            const newTransaction = {
                description : description.value,
                money : Number(totalMoney.value),
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
            newTransactionForm.classList.remove('active');
            renderBalance(transactions);
            renderTransactions(transactions);

        } else {
            alert("Harap Masukkan Informasi Yang Lengkap");
        }

    });
});

function renderBalance(elements) {
    let balance = 0;
    let inBalance = 0;  
    let outBalance = 0;
    
    elements.forEach(item => {
        if (item.transactionType == "Income") {
            balance += item.money;
            inBalance += item.money;
        } else if (item.transactionType == "Expense" && balance > 0) {
            balance -= item.money;
            outBalance += item.money;
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

function renderTransactions(items) {
    const transactionLists = document.querySelector('.list-transactions');
    transactionLists.innerHTML = '';
    
    items?.forEach(item => {
        const newTransactionList = document.createElement('section');
        newTransactionList.classList.add('transaction');
    
        const newDesc = document.createElement('p');
        newDesc.classList.add('text');
        newDesc.textContent = item.description;
    
        const newBalance = document.createElement('p');
        newBalance.classList.add('balance');
        newBalance.textContent = item.transactionType == "Income" ? `+Rp${item.money.toLocaleString('id-ID')}` : `-Rp${item.money.toLocaleString('id-ID')}`;
    
        const newDate = document.createElement('p');
        newDate.classList.add('date');
        newDate.textContent = item.date;
    
        const newDelButton = document.createElement('button');
        newDelButton.setAttribute('type', 'button');
        newDelButton.textContent = 'D';
        
        newTransactionList.appendChild(newDesc);
        newTransactionList.appendChild(newBalance);
        newTransactionList.appendChild(newDate);
        newTransactionList.appendChild(newDelButton);
        
        transactionLists.appendChild(newTransactionList);
    });
    
}

