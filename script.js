const transactionFilter = document.querySelectorAll('.transaction-filter button');
const totalBalance = document.querySelector('.total-balance .balance');
const incomingBalance = document.querySelector('.income-balance .in-balance');
const expenseBalance = document.querySelector('.expense-balance .out-balance');
const addTransaction = document.querySelector('.add-transaction');

const transactions = JSON.parse(localStorage.getItem('transactions')) ?? [];

renderBalance(transactions);

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
        if (description.value.length > 0 && totalMoney.value.length > 0 && transactionType.value != "Transaction Type" && (incomeType.value != "Income Type" || expenseType.value != "Expense Type")) {
            const newTransaction = {
                description : description.value,
                money : Number(totalMoney.value),
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
            renderBalance(transactions);
        } else {
            alert("Harap Masukkan Informasi Yang Lengkap");
        }

    });
});

function renderBalance(elements) {
    let balance = 0;
    let inBalance = 0;
    // const inBalance = filter(elements, "Income").length > 1 ? filter(elements, "Income").reduce((total, income) => total.money + income.money) : filter(elements, "Income")[0].money;
    // inBalance = inBalance.length > 1 ? inBalance.reduce((total, income) => total.money + income.money) : inBalance[0].money;
    
    let outBalance = 0;
    // let outBalance = elements.filter(transaction => transaction.transactionType == "Expense");
    // // outBalance = outBalance.length > 1 ? outBalance.reduce((total, outgoing) => total.money + outgoing.money) : outBalance[0].money;

    
    elements.forEach(item => {
        if (item.transactionType == "Income") {
            balance += item.money;
            inBalance += item.money;
        } else if (item.transactionType == "Expense" && balance > 0) {
            balance -= item.money;
            outBalance += item.money;
            
        }
    });
    
    console.log(inBalance)
    console.log(outBalance)

    totalBalance.textContent = `Rp${balance.toLocaleString('id-ID')}`;
    incomingBalance.textContent = `+Rp${inBalance.toLocaleString('id-ID')}`;
    expenseBalance.textContent = `-Rp${outBalance.toLocaleString('id-ID')}`;

    // toLocalString akan memgonversi angka otomatis memformat angka sesuai dengan pengaturan browser, kalau mau costum tinggal di isi dengan argumen negara yang dituju, seperti indonesia (id-ID) yang pemisah ribuannya adalah titik, atau amerika (en-US) yang pemisah ribuannya adalah koma
    
    // atau kalau mau yang penggunaan performanya lebih sedikti bisa menggunakan yang lebih disarankan yaitu 
    // Intl.NumberFormat(angka yang mau diformat) lebih lengkapnya silahkan searching 
}

// function filter(items, type) {
//     return items.filter(transaction => transaction.transactionType == type)
// }


