const numberKeys = document.querySelectorAll(".number");
const operatorKeys = document.querySelectorAll(".operator");
const display = document.getElementById("display");
const clear = document.getElementById("clear");
const allClear = document.getElementById("allClear");

let input = "";
let placeholder;
let output = "";
let mode = "";
let operatorActive = false;

numberKeys.forEach((key) => {
  key.addEventListener("click", () => {
    if (input.length < 10) {
      if (input == "0") {
        input = key.id;
      } else {
        input += key.id;
      }
      display.textContent = `${input}`;
    }
  });
});

operatorKeys.forEach((key) => {
  key.addEventListener("click", () => {
    mode = key.id;
  });
});

clear.addEventListener("click", () => {
  input = "";
  display.textContent = `${input}`;
});

function operate() {}
