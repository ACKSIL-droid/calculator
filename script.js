const numberKeys = document.querySelectorAll(".number");
const operatorKeys = document.querySelectorAll(".operator");
const display = document.getElementById("display");
const clear = document.getElementById("clear");
const allClear = document.getElementById("allClear");
const equals = document.getElementById("equals");

let operand1 = "0";
let operand2 = "0";
let firstCalculation = true;
let operation = "";
let output = "0";

display.textContent = "";

numberKeys.forEach((key) => {
  key.addEventListener("click", () => {
    let keyNumber = key.id;
    let currentNumber = "0";
    if (firstCalculation) {
      currentNumber = setInput(operand1, keyNumber);
      operand1 = currentNumber;
      display.textContent = operand1;
    } else {
      currentNumber = setInput(operand2, keyNumber);
      operand2 = currentNumber;
      display.textContent = operand2;
    }
  });
});

operatorKeys.forEach((key) => {
  key.addEventListener("click", () => {
    let result = "";
    if (firstCalculation) {
      result = operand1;
      firstCalculation = false;
      operation = key.id;
    } else {
      result = getResult(operation, operand1, operand2);
      operation = key.id;
      operand1 = result;
      operand2 = "";
    }
    display.textContent = result;
  });
});

clear.addEventListener("click", () => {
  output = "";
  display.textContent = `${output}`;
});

function setInput(operand, key) {
  if (operand.length < 10) {
    if (operand == "0") {
      operand = key;
    } else {
      operand += key;
    }
  }
  return operand;
}

function getResult(operation, operand1, operand2) {
  let result;
  switch (operation) {
    case "add":
      result = parseInt(operand1) + parseInt(operand2);
      break;
    case "subtract":
      result = operand1 - operand2;
      break;
    case "multiply":
      result = operand1 * operand2;
      break;
    case "divide":
      result = operand1 / operand2;
      break;
    case "percent":
      result = operand1 * (operand2 / 100);
      break;
  }
  return result;
}
