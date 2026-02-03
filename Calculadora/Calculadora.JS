const display = document.getElementById("display");
const numberButtons = document.querySelectorAll(".Number");
const operatorButtons = document.querySelectorAll(".Operator");
const equalsButton = document.getElementById("equalsButton");

console.log("equalsButton:", equalsButton);

let currentValue = "";
let previousValue = "";
let operator = null;

function addNumber(value) {
  currentValue += value;
  display.value = currentValue;
}

numberButtons.forEach((button) => {
  button.addEventListener("click", () => addNumber(button.innerText));
});

operatorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (!button.dataset.op) return; // blindagem
    if (currentValue === "") return;

    previousValue = currentValue;
    operator = button.dataset.op;
    currentValue = "";
    display.value = "";
  });
});

equalsButton?.addEventListener("click", calculate);

function calculate() {
  console.log({ previousValue, currentValue, operator });

  if (previousValue === "" || currentValue === "" || !operator) return;

  const num1 = Number(previousValue);
  const num2 = Number(currentValue);
  let result;

  switch (operator) {
    case "+": result = num1 + num2; break;
    case "-": result = num1 - num2; break;
    case "*": result = num1 * num2; break;
    case "/":
      if (num2 === 0) return alert("Não pode dividir por zero");
      result = num1 / num2;
      break;
    default:
      return;
  }

  display.value = result;
  currentValue = String(result);
  previousValue = "";
  operator = null;
}
