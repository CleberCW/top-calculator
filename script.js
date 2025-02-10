// Operator function
function operate(a, b, operator) {
  switch (operator) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "×":
      return a * b;
    case "÷":
      if (b === 0) {
        return "ERROR";
      }
      return a / b;
    case "=":
      return result;
  }
}

// DOM retrieval
const screen = document.querySelector("#screen-text");
const operatorButtons = document.querySelectorAll(".operator");
const numberButtons = document.querySelectorAll(".number");
const backspaceButton = document.querySelector("#backspace");
const cleanMemoryButton = document.querySelector("#clean-memory");
const decimalButton = document.querySelector(".float");
const plusMinusButton = document.querySelector(".plus-minus");
const helpButton = document.querySelector(".help-button");
const helpBox = document.querySelector("#help");

// Initializing variables
let a = 0;
let b = 0;
let shouldDisplayBeCleaned = false;
let hasOperatorBeenPressed = false;
let result = 0;
let chosenOperator = "";
let numberArray = Array.from(numberButtons);
let operatorArray = Array.from(operatorButtons);

//Toggle help box on/off
helpButton.addEventListener("click", () => {
  helpBox.classList.toggle("invisible");
});

//Change number to negative/positive
plusMinusButton.addEventListener("click", () => {
  if (!hasOperatorBeenPressed) {
    if (screen.innerText.charAt(0) == "-") {
      screen.innerText = screen.innerText.substring(1);
    } else {
      screen.innerText = `-${screen.innerText}`;
    }
  }
});

//Add decimal point (only once)
decimalButton.addEventListener("click", () => {
  if (!screen.innerText.includes(decimalButton.innerText)) {
    screen.innerText += decimalButton.innerText;
  }
});

//Clean memory
const cleanMemoryFunction = () => {
  screen.innerText = "0";
  a = 0;
  b = 0;
  result = 0;
  shouldDisplayBeCleaned = true;
  hasOperatorBeenPressed = false;
};

cleanMemoryButton.addEventListener("click", () => {
  cleanMemoryFunction();
});

//Display backspace
const backSpaceFunction = () => {
  screen.innerText = screen.innerText.substring(0, screen.innerText.length - 1);
};

backspaceButton.addEventListener("click", () => {
  backSpaceFunction();
});

//Receive digits input
const numberFunction = (button) => {
  if (shouldDisplayBeCleaned) {
    screen.innerText = "";
    shouldDisplayBeCleaned = false;
    screen.innerText += button.innerText;
  } else if (screen.innerText.length < 10) {
    screen.innerText += button.innerText;
  }
  hasOperatorBeenPressed = false;
};

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    numberFunction(button);
  });
});

//Receive operators input
const operatorFunction = (button) => {
  if (hasOperatorBeenPressed) {
    chosenOperator = button.innerText;
    return;
  } else if (a == 0) {
    a = Number(screen.innerText);
    shouldDisplayBeCleaned = true;
    chosenOperator = button.innerText;
  } else {
    b = b == Number(screen.innerText) ? b : Number(screen.innerText);
    shouldDisplayBeCleaned = true;
    result = operate(a, b, chosenOperator);
    if (result == "ERROR") {
      screen.innerText = "ERRO";
      result = a;
      b = 0;
    } else {
      chosenOperator = button.innerText;
      a = result;
      if (result < 9999999999) {
        screen.innerText = result;
      } else {
        screen.innerText = "Too large num";
      }
    }
  }
  hasOperatorBeenPressed = true;
};

operatorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    operatorFunction(button);
  });
});

//Keyboard support
document.addEventListener("keydown", (e) => {
  console.log(e.key);
  if (/[0-9]/.test(e.key)) {
    let keyMap = numberArray.find((node) => node.innerText == e.key);
    numberFunction(keyMap);
  } else if (e.key == "Escape") {
    cleanMemoryFunction();
  } else if (e.key == "Backspace") {
    backSpaceFunction();
  } else {
    let keyMap = operatorArray.find((node) => node.id == e.key);
    console.log(keyMap);
    if (keyMap) {
      operatorFunction(keyMap);
    }
  }
});
