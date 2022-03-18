const display = document.getElementById("display");

const numberKeys = document.querySelectorAll(".number");
const operatorKeys = document.querySelectorAll(".operator");
const memoryKeys = document.querySelectorAll(".memfunction");

const clear = document.getElementById("clear");
const allClear = document.getElementById("allClear");
const equals = document.getElementById("equals");
const decimal = document.getElementById("decimal");
const plusMinus = document.getElementById("plusMinus");

let operand1 = "";
let operand2 = "";
let firstCalculation = true;
let operation = "";

display.textContent = "";

numberKeys.forEach((key) => {
  key.addEventListener("click", () => {
    let keyNumber = key.id;
    let currentNumber = "";
    if (firstCalculation) {
      currentNumber = limitInput(operand1, keyNumber);
      operand1 = currentNumber;
      display.textContent = operand1;
    } else {
      currentNumber = limitInput(operand2, keyNumber);
      operand2 = currentNumber;
      display.textContent = operand2;
    }
  });
});

operatorKeys.forEach((key) => {
  key.addEventListener("click", () => {
    let result = "";
    if (firstCalculation || operand2 == "") {
      result = operand1;
      firstCalculation = false;
      operation = key.id;
    } else {
      result = `${getResult(operation, operand1, operand2)}`;
      operation = key.id;
      operand1 = result;
      operand2 = "";
    }
    display.textContent = result;
  });
});

equals.addEventListener("click", () => {
  let result = "";
  if (firstCalculation || operand2 == "") {
    result = operand1;
  } else {
    result = `${getResult(operation, operand1, operand2)}`;
    operand1 = result;
    operand2 = "";
    firstCalculation = true;
  }
  display.textContent = result;
});

plusMinus.addEventListener("click", () => {
  let negativeNumber = 0;
  if (firstCalculation && !(operand1 == "" || operand1 == "0")) {
    negativeNumber = parseFloat(operand1) * -1;
    operand1 = `${negativeNumber}`;
    display.textContent = operand1;
  } else if (!(operand2 == "" || operand2 == "0")) {
    negativeNumber = parseFloat(operand2) * -1;
    operand2 = `${negativeNumber}`;
    display.textContent = operand2;
  }
});

allClear.addEventListener("click", () => {
  fullClear();
});

clear.addEventListener("click", () => {
  partialClear();
});

function limitInput(operand, key) {
  if (operand.length < 10) {
    if (key == "decimal" && !operand.includes(".")) {
      return operand + ".";
    } else if (operand == "0") {
      operand = key;
      return operand;
    } else if (!(key == "decimal")) {
      return operand + key;
    } else {
      return operand;
    }
  }
}

function getResult(operation, operand1, operand2) {
  let result;
  switch (operation) {
    case "add":
      result = parseFloat(operand1) + parseFloat(operand2);
      break;
    case "subtract":
      result = operand1 - operand2;
      break;
    case "multiply":
      result = operand1 * operand2;
      break;
    case "divide":
      if (operand2 == "0") {
        result = "error";
      } else {
        result = operand1 / operand2;
      }
      break;
    case "percent":
      result = operand1 * (operand2 / 100);
      break;
  }
  if (result == "error") {
    return "MATH ERR.";
  } else {
    return constrainDisplayLength(result);
  }
}

function constrainDisplayLength(result) {
  let output = result;
  let resultStr = `${result}`;
  if (resultStr.length > 10) {
    if (result > 9999999999) {
      output = result.toExponential(2);
    } else {
      output = result.toPrecision(10);
    }
  }
  return output;
}

function fullClear() {
  operand1 = "";
  operand2 = "";
  firstCalculation = true;
  operation = "";
  display.textContent = "";
}

function partialClear() {
  operand2 = "";
  display.textContent = "0";
}
