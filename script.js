let topDisplay = document.querySelector('#top');
let bottomDisplay = document.querySelector('#bottom');

// https://stackoverflow.com/questions/10454518/javascript-how-to-retrieve-the-number-of-decimals-of-a-string-number
function decimalPlaces(num) {
    var match = ('' + num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
    if (!match) { return 0; }
    return Math.max(
        0,
        // Number of digits right of decimal point.
        (match[1] ? match[1].length : 0)
        // Adjust for scientific notation.
        - (match[2] ? +match[2] : 0));
}

function divide(x, y) {
    let result = x / y;
    return decimalPlaces(result) > 4 ? result.toFixed(4) : result
}

function multiply(x, y) {
    let result = x * y
    return decimalPlaces(result) > 4 ? result.toFixed(4) : result
}

function add(x, y) {
    let result = x + y;
    return decimalPlaces(result) > 4 ? result.toFixed(4) : result
}

function subtract(x, y) {
    let result = x ** y;
    return decimalPlaces(result) > 4 ? result.toFixed(4) : result
}

function power(x, y) {
    let result = x ** y;
    return decimalPlaces(result) > 4 ? result.toFixed(4) : result
}

function compute(operator, num1, num2) {
    switch (operator) {
        case '+':
            return add(num1, num2)
        case '-':
            return subtract(num1, num2)
        case '×':
            return multiply(num1, num2)
        case '÷':
            if (num2 == 0) {
                return NaN;
            }
            return divide(num1, num2)
        case '^':
            return power(num1, num2)
    }
}

let operator;
let firstNum = '';
let secondNum = '';
let runningTotal;

const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
    button.addEventListener('click', () => {
        let buttonType = button.className;
        switch(buttonType) {
            case 'digit':
                if (runningTotal && (bottomDisplay.textContent !== '')) {
                    break
                }
                topDisplay.textContent += button.textContent;
                if (!operator) {
                    firstNum += button.textContent;
                } else {
                    secondNum += button.textContent
                }
                console.log(firstNum, operator, secondNum)
                break
            case 'operator':
                if (firstNum !== '' && secondNum == '') {
                    operator = button.textContent;
                    bottomDisplay.textContent = '';
                }
                if (runningTotal) {
                    topDisplay.textContent = runningTotal;
                }
                // if operator exists, then compute what we have and then set runningTotal and firstNum
                if (secondNum !== '') {
                    runningTotal = compute(operator, parseFloat(firstNum), parseFloat(secondNum))
                    console.log(runningTotal);
                    operator = button.textContent;
                    secondNum = '';
                    firstNum = runningTotal;
                    topDisplay.textContent = runningTotal;
                }
                topDisplay.textContent += button.textContent;
                console.log(runningTotal, operator);
                break
            case 'decimal':
                if (secondNum == '' && operator == null) {
                    firstNum += '.';
                } else {
                    secondNum += '.';
                }
                topDisplay.textContent += button.textContent;
                break
            case 'compute':
                runningTotal = compute(operator, parseFloat(firstNum), parseFloat(secondNum))
                operator = secondNum = '';
                firstNum = runningTotal;
                bottomDisplay.textContent = runningTotal
                break
            case 'clear':
                topDisplay.textContent = '';
                bottomDisplay.textContent = '';
                operator = firstNum = secondNum = '';
                break
        }
        console.log(firstNum, operator, secondNum)
    })
})