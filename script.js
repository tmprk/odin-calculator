let topField = document.querySelector('#top');

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
        case '–':
            return subtract(num1, num2)
        case '×':
            return multiply(num1, num2)
        case '÷':
            return divide(num1, num2)
    }
}

let operations = ['']
let currentIndex = 0;

const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
    button.addEventListener('click', () => {
        let buttonType = button.className;
        // console.log(buttonType);
        switch(buttonType) {
            case 'digit':
                // if(operations[currentIndex].)
                operations[currentIndex] += button.textContent;
                break
            case 'operator':
                operations.push(button.textContent);
                currentIndex += 1
                break
            case 'decimal':
                operations[currentIndex] += '.';
                break
            case 'compute':
                // console.log(operators)
        }
        console.log(operations)
        let character = button.textContent;
        topField.textContent += character;
    })
})