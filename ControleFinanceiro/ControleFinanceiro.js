let transactions = []

const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const typeSelect = document.getElementById("type");
const addButton = document.getElementById("addButton");
const transactionList = document.getElementById("transactionList");
const income = document.getElementById("income");
const expense = document.getElementById("expense");
const balance = document.getElementById("balance");


addButton.addEventListener("click", addTransaction);

function addTransaction() {
  const description = descriptionInput.value.trim();
  const amount = parseFloat(amountInput.value);
  const type = typeSelect.value;

  if (description === "" || isNaN(amount)) return;

  const newTransaction = { description, amount, type };

  transactions.push(newTransaction);

  renderTransactions();
  calculateTotal();

  descriptionInput.value = "";
  amountInput.value = "";
  typeSelect.value = "income";
}


function renderTransactions() {
  transactionList.innerHTML = "";

  transactions.forEach((t) => {
    const li = document.createElement("li");

    const sign = t.type === "expense" ? "-" : "+";
    const label = t.type === "expense" ? "Despesa" : "Receita";

    li.textContent = `${sign} ${label} | ${t.description} - R$ ${t.amount.toFixed(2)}`;
    li.classList.add(t.type);

    transactionList.appendChild(li);
  });
}
function calculateTotal() {
  const incomeTotal = transactions
    .filter(t => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);

  const expenseTotal = transactions
    .filter(t => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  const balanceTotal = incomeTotal - expenseTotal;

  income.innerHTML = `R$ ${incomeTotal.toFixed(2)}`;
  expense.innerHTML = `R$ ${expenseTotal.toFixed(2)}`;
  balance.innerHTML = `R$ ${balanceTotal.toFixed(2)}`;

  console.log("Income:", incomeTotal, "Expense:", expenseTotal, "Balance:", balanceTotal);
}
