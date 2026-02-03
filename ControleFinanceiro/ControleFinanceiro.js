let transaction = []

const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const typeSelect = document.getElementById("type");
const addButton = document.getElementById("addButton");
const transactionList = document.getElementById("transactionList");

function addTransaction() {
    const description = descriptionInput.value;
    const amount = parseFloat(amountInput.value);
    const type = typeSelect.value;
    if(description || isNaN(amount)) return;

    const transaction = {
        description,
        amount,
        type
    };

    transaction.push(transaction);

    renderTransactions();

    descriptionInput.value = "";
    amountInput.value = "";
    typeSelect.value = "";
}

function renderTransactions() {
    transactionList.innerHTML = "";

    transaction.forEach(transaction => {
        const li = document.createElement("li");
        li.textContent = `${transaction.description} - R$ ${transaction.amount.toFixed(2)}`;
        transactionList.appendChild(li);
    });
}