const screen = document.querySelector(".screen");
const numbers = document.querySelectorAll(".numbers h2");
const operators = document.querySelectorAll(".operators h2");
const clear = document.getElementById("clear");
const equals = document.getElementById("=");

function updateScreen(value) {
  screen.textContent = toArabicNumerals(value);
}

function toArabicNumerals(num) {
  const arabicDigits = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
  return num
    .toString()
    .split("")
    .map((digit) => (/\d/.test(digit) ? arabicDigits[digit] : digit))
    .join("");
}

let displayValue = "";
let num1 = "";
let operator = "";
let num2 = "";
let isSecondNumber = false;

numbers.forEach((number) => {
  number.addEventListener("click", () => {
    if (!isSecondNumber) {
      num1 += number.id;
      displayValue = num1;
    } else {
      num2 += number.id;
      displayValue = `${num1} ${operator} ${num2}`;
    }
    updateScreen(displayValue);
  });
});

operators.forEach((op) => {
  op.addEventListener("click", () => {
    if (num1 === "") {
      alert("Enter a number first!");
      return;
    }
    if (!isSecondNumber) {
      operator = op.id;
      isSecondNumber = true;
      displayValue = `${num1} ${operator}`;
      updateScreen(displayValue);
    }
  });
});

equals.addEventListener("click", () => {
  if (num1 !== "" && operator !== "" && num2 !== "") {
    const result = operate(operator, parseFloat(num1), parseFloat(num2));
    updateScreen(result);
    num1 = result.toString();
    operator = "";
    num2 = "";
    isSecondNumber = false;
  } else {
    alert("Incomplete expression!");
  }
});

clear.addEventListener("click", () => {
  screen.textContent = "٠";
  displayValue = "";
  num1 = "";
  operator = "";
  num2 = "";
  isSecondNumber = false;
});

function add(a, b) {
  return a + b;
}
function substract(a, b) {
  return a - b;
}
function multiply(a, b) {
  return a * b;
}
function divide(a, b) {
  if (b === 0) {
    return "Error: Division by zero";
  }
  return a / b;
}

function operate(operator, a, b) {
  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return substract(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      return divide(a, b);
    default:
      return "Error: Invalid operator";
  }
}
