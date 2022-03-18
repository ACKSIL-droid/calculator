const display = document.getElementById("display");
const memoryDisplay = document.getElementById("memDisplay");

const numberKeys = document.querySelectorAll(".number");
const operatorKeys = document.querySelectorAll(".operator");
const memoryKeys = document.querySelectorAll(".memfunction");

const clear = document.getElementById("clear");
const allClear = document.getElementById("allClear");
const equals = document.getElementById("equals");
const decimal = document.getElementById("decimal");
const squareRoot = document.getElementById("sqRt");
const plusMinus = document.getElementById("plusMinus");

let operand1 = "";
let operand2 = "";
let operation = "";
let firstCalculation = true;
let rootOperand = false;
let memoryHolder = "";
let memoryStatus = false;

display.textContent = "";

numberKeys.forEach((key) => {
  key.addEventListener("click", () => {
    let keyNumber = key.id;
    let currentNumber = "";
    if (firstCalculation) {
      currentNumber = handleInput(operand1, keyNumber);
      operand1 = currentNumber;
      display.textContent = operand1;
    } else {
      currentNumber = handleInput(operand2, keyNumber);
      operand2 = currentNumber;
      display.textContent = operand2;
    }
  });
});

operatorKeys.forEach((key) => {
  key.addEventListener("click", () => {
    let result = "";
    if (firstCalculation || operand2 === "") {
      rootOperand ? (result = findRoot(operand1)) : (result = operand1);
      firstCalculation = false;
      operation = key.id;
    } else {
      rootOperand
        ? (result = `${getResult(operation, operand1, findRoot(operand2))}`)
        : (result = `${getResult(operation, operand1, operand2)}`);
      operation = key.id;
      operand1 = result;
      operand2 = "";
    }
    display.textContent = result;
  });
});

equals.addEventListener("click", () => {
  let result = "";
  if (firstCalculation || operand2 === "") {
    rootOperand ? (result = findRoot(operand1)) : (result = operand1);
  } else {
    rootOperand
      ? (result = `${getResult(operation, operand1, findRoot(operand2))}`)
      : (result = `${getResult(operation, operand1, operand2)}`);
    operand1 = result;
    operand2 = "";
    firstCalculation = true;
  }
  display.textContent = result;
});

squareRoot.addEventListener("click", () => {
  rootOperand = true;
});

plusMinus.addEventListener("click", () => {
  let negativeNumber = 0;
  if (firstCalculation && !(operand1 === "" || operand1 === "0")) {
    negativeNumber = parseFloat(operand1) * -1;
    operand1 = `${negativeNumber}`;
    display.textContent = operand1;
  } else if (!(operand2 === "" || operand2 === "0")) {
    negativeNumber = parseFloat(operand2) * -1;
    operand2 = `${negativeNumber}`;
    display.textContent = operand2;
  }
});

memoryKeys.forEach((key) => {
  key.addEventListener("click", () => {
    let memoryFunction = key.id;
    handleMemory(memoryFunction);
  });
});

allClear.addEventListener("click", () => {
  fullClear();
});

clear.addEventListener("click", () => {
  partialClear();
});

function handleInput(operand, key) {
  if (operand.length < 10) {
    if (key === "decimal") {
      if (!operand.includes(".")) {
        return operand + ".";
      } else {
        return operand;
      }
    } else if (operand === "0") {
      operand = key;
      return operand;
    } else if (!(key === "decimal")) {
      return operand + key;
    }
  } else {
    return operand;
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

function findRoot(operand) {
  let number = parseFloat(operand);
  let root = 0;
  if (number < 0) {
    rootOperand = false;
    return operand;
  } else {
    root = Math.sqrt(number);
    operand = `${root.toPrecision(9)}`;
    rootOperand = false;
    return operand;
  }
}

function constrainDisplayLength(result) {
  let output = result;
  let resultStr = `${result}`;
  if (resultStr.length > 10) {
    if (result > 9999999999) {
      output = result.toExponential(2);
    } else {
      output = result.toPrecision(9);
    }
  }
  return output;
}

function handleMemory(memoryFunction) {
  switch (memoryFunction) {
    case "memPlus":
      firstCalculation ? (memoryHolder = operand1) : (memoryHolder = operand2);
      memoryDisplay.textContent = "M+";
      memoryStatus = true;
      break;
    case "memMinus":
      memoryHolder = "";
      memoryDisplay.textContent = "";
      memoryStatus = false;
      break;
    case "memRecall":
      if (memoryStatus) {
        if (firstCalculation) {
          operand1 = memoryHolder;
          display.textContent = operand1;
        } else {
          operand2 = memoryHolder;
          display.textContent = operand2;
        }
      }
      break;
  }
}

function fullClear() {
  operand1 = "";
  operand2 = "";
  operation = "";
  memoryHolder = "";
  firstCalculation = true;
  rootOperand = false;
  display.textContent = "";
}

function partialClear() {
  operand2 = "";
  display.textContent = "0";
}
