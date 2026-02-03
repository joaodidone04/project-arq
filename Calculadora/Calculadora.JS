const display = document.getElementById("display");
const numberButtons = document.querySelectorAll(".Number");
const operatorButtons = document.querySelectorAll(".Operator");
const equalsButton = document.getElementById("equalsButton");

console.log("equalsButton:", equalsButton);

let currentValue = "";
let previousValue = "";
let operator = null;

function updateDisplay() {
  const opSymbol = operator ?? "";
  display.value = `${previousValue}${opSymbol}${currentValue}`;
}


function addNumber(value) {
  currentValue += value;
  updateDisplay();
}

numberButtons.forEach((button) => {
  button.addEventListener("click", () => addNumber(button.innerText));
});

operatorButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    if (currentValue === "" && previousValue === "") return;

    if (previousValue === "") {
      previousValue = currentValue;
      currentValue = "";
    }

    operator = btn.dataset.op || btn.innerText; // fallback
    updateDisplay();
  });
});



equalsButton?.addEventListener("click", calculate);

function calculate() {
  if (previousValue === "" || currentValue === "" || !operator) return;

  const num1 = parseFloat(previousValue);
  const num2 = parseFloat(currentValue);
  let result;

  switch (operator) {
    case "+": result = num1 + num2; break;
    case "-": result = num1 - num2; break;
    case "*": result = num1 * num2; break;
    case "/":
      if (num2 === 0) return alert("Não pode dividir por 0");
      result = num1 / num2;
      break;
    default:
      return; // operador inválido
  }

  display.value = result;
  currentValue = result.toString();
  previousValue = "";
  operator = null;
}



const backspaceBtn = document.getElementById("backspaceButton");

backspaceBtn.addEventListener("click", backspace);

function backspace() {
  if (currentValue !== "") {
    currentValue = currentValue.slice(0, -1);
    updateDisplay();
    return;
  }

  if (operator !== null) {
    operator = null;
    currentValue = previousValue;
    previousValue = "";
    updateDisplay();
  }
}

const allClearButton = document.getElementById("allClearButton");

allClearButton.addEventListener("click", clearAll);
function clearAll() {
  currentValue = "";
  previousValue = "";
  operator = null;
  display.value = "";
}

const signButton = document.getElementById("signButton");
signButton.addEventListener("click", toggleSign);
function toggleSign() {
  if (currentValue === "") return;
  const num = parseFloat(currentValue);
  currentValue = (-num).toString();
  updateDisplay();
}

const percentageButton = document.getElementById("percentageButton");
percentageButton.addEventListener("click", convertToPercentage);

function convertToPercentage() {
  if (currentValue === "") return;

  const current = Number(currentValue);
  if(previousValue !== ""){
    const previous = Number(previousValue);
    currentValue = ((previous*current)/100).toString();
  }else{
    currentValue = (current/100).toString();
  }
  updateDisplay();
} 