const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
const equalsButton = document.getElementById('equals');
const clearButton = document.getElementById('clear');

let currentInput = '';

const updateDisplay = (value) => {
    display.value = value || '0'; 
};

const handleButtonClick = (e) => {
    const value = e.target.getAttribute('data-value');

    if (
        ['+', '-', '*', '/'].includes(value) &&
        (currentInput === '' || ['+', '-', '*', '/'].includes(currentInput.slice(-1)))
    ) {
        return; 
    }

    currentInput += value;
    updateDisplay(currentInput);
};


const calculateResult = () => {
    try {
        if (currentInput.trim() !== '') {
            const sanitizedInput = currentInput.replace(/[^0-9+\-*/.]/g, '');
            const result = Function(`return ${sanitizedInput}`)();
            currentInput = result.toString();
            updateDisplay(currentInput);
        }
    } catch (error) {
        updateDisplay('Error');
        currentInput = '';
    }
};

const clearDisplay = () => {
    currentInput = '';
    updateDisplay();
};

buttons.forEach((button) => {
    button.addEventListener('click', handleButtonClick);
});

equalsButton.addEventListener('click', calculateResult);

clearButton.addEventListener('click', clearDisplay);

updateDisplay();
