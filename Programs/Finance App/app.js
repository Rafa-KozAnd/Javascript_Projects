document.getElementById('addTransactionButton').addEventListener('click', addTransaction);

let transactions = [];

function addTransaction() {
    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const transactionType = document.getElementById('transactionType').value;

    if (!description || isNaN(amount)) {
        alert('Por favor, insira uma descrição e um valor válido.');
        return;
    }

    const transaction = {
        id: generateID(),
        description: description,
        amount: amount,
        type: transactionType
    };

    transactions.push(transaction);
    updateDOM();
    updateBalance();
}

function generateID() {
    return Math.floor(Math.random() * 1000000);
}

function updateDOM() {
    const transactionList = document.getElementById('transactions');
    transactionList.innerHTML = '';

    transactions.forEach(transaction => {
        const transactionItem = document.createElement('li');
        transactionItem.classList.add('transaction');
        transactionItem.classList.add(transaction.type);
        transactionItem.textContent = `${transaction.description}: R$ ${transaction.amount.toFixed(2)}`;
        transactionItem.appendChild(createDeleteButton(transaction.id));
        transactionList.appendChild(transactionItem);
    });
}

function createDeleteButton(id) {
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'X';
    deleteButton.addEventListener('click', () => {
        transactions = transactions.filter(transaction => transaction.id !== id);
        updateDOM();
        updateBalance();
    });
    return deleteButton;
}

function updateBalance() {
    const balance = transactions.reduce((acc, transaction) => {
        return transaction.type === 'income' ? acc + transaction.amount : acc - transaction.amount;
    }, 0);

    document.getElementById('currentBalance').textContent = `R$ ${balance.toFixed(2)}`;
}

document.getElementById('description').value = '';
document.getElementById('amount').value = '';
document.getElementById('transactionType').value = 'income';
