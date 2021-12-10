let topDisplay = document.querySelector('#top');
let bottomDisplay = document.querySelector('#bottom');

function divide(x, y) {
    return x / y
}

function multiply(x, y) {
    return x * y
}

function add(x, y) {
    return x + y;
}

function subtract(x, y) {
    return x - y;
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
            return divide(num1, num2)
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
                topDisplay.textContent += button.textContent;
                if (!operator) {
                    firstNum += button.textContent;
                } else {
                    secondNum += button.textContent
                }
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
                console.log(operator);
                break
            case 'decimal':
                firstNum += '.';
                break
            case 'compute':
                runningTotal = compute(operator, parseFloat(firstNum), parseFloat(secondNum))
                operator = secondNum = '';
                firstNum = runningTotal;
                bottomDisplay.textContent = runningTotal
        }
        console.log(firstNum, operator, secondNum)
    })
})