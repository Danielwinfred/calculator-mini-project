// Fetch DOM elements
const display = document.getElementById('display');
const buttons = document.querySelectorAll('.buttons button');
const clearButton = document.getElementById('clear');
const equalsButton = document.getElementById('equals');

// Initial state
let currentInput = '';
let previousInput = '';
let operator = null;

// Update the display
function updateDisplay(value) {
  display.textContent = value;
}

// Handle button clicks
buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.getAttribute('data-value');
    if (isNaN(value) && value !== '.' && value !== '+' && value !== '-' && value !== '*' && value !== '/') {
      alert('Please enter a number or a valid operator.');
    } else {
      handleInput(value);
    }
  });
});

// Handle input for numbers and operators
function handleInput(value) {
  if ('0123456789.'.includes(value)) {
    // If it's a number or decimal point, add it to current input
    currentInput += value;
    updateDisplay(currentInput);
  } else if ('+-*/'.includes(value)) {
    // If it's an operator, save the current input and set the operator
    if (currentInput === '') return; // Prevent operator input without numbers
    previousInput = currentInput;
    currentInput = '';
    operator = value;
  }
}

//  (calculate result)
equalsButton.addEventListener('click', () => {
  if (currentInput === '' || previousInput === '') return;
  const result = calculateResult(previousInput, operator, currentInput);
  updateDisplay(result);
  currentInput = result;
  previousInput = '';
  operator = null;
});

// result based on the operator
function calculateResult(a, operator, b) {
  const numA = parseFloat(a);
  const numB = parseFloat(b);
  switch (operator) {
    case '+': return numA + numB;
    case '-': return numA - numB;
    case '*': return numA * numB;
    case '/': return numA / numB;
    default: return 0;
  }
}

// Handle cl
clearButton.addEventListener('click', () => {
  currentInput = '';
  previousInput = '';
  operator = null;
  updateDisplay('0');
});

// Keyboard 
document.addEventListener('keydown', (event) => {
  const key = event.key;
  if ('0123456789'.includes(key)) {
    handleInput(key);
  } else if ('+-*/'.includes(key)) {
    handleInput(key);
  } else if (key === 'Enter') {
    equalsButton.click();
  } else if (key === 'Backspace') {
    currentInput = currentInput.slice(0, -1);
    updateDisplay(currentInput);
  } else if (key === 'Escape') {
    clearButton.click();
  } else {
    alert('Invalid key. Please enter a valid number or operator.');
  }
});
