const numberKeys = document.querySelectorAll(".number");
const operatorKeys = document.querySelectorAll(".operator");
const display = document.getElementById("display");
const clear = document.getElementById("clear");
const allClear = document.getElementById("allClear");
const equals = document.getElementById("equals");

let operand1 = "";
let operand2 = "";
let firstCalculation = true;
let operation = "";

display.textContent = "";

numberKeys.forEach((key) => {
  key.addEventListener("click", () => {
    let keyNumber = key.id;
    let currentNumber = "0";
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

allClear.addEventListener("click", () => {
  fullClear();
});

clear.addEventListener("click", () => {
  partialClear();
});

function fullClear() {
  operand1 = "";
  operand2 = "";
  firstCalculation = true;
  operation = "";
  display.textContent = "";
}

function partialClear() {
  operand2 = "";
  display.textContent = "";
}

function limitInput(operand, key) {
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
  return constrainDisplayLength(result);
}

function constrainDisplayLength(result) {
  let output = result;
  let resultStr = `${result}`;
  if (result == "error") {
    return "MATH ERR.";
  }
  if (resultStr.length > 11) {
    if (result > 9999999999) {
      output = result.toExponential(2);
    } else {
      if (resultStr.includes(".")) {
        let number = resultStr.split(".");
        let integralLength = number[0].length;
        let places = 10 - integralLength;
        output = result.toFixed(places);
      }
    }
  }
  return output;
}
