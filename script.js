const display = document.getElementById('display');
const maxLength = 20;

function updateDisplay() {
    if (display.textContent.length > maxLength) {
        display.textContent = display.textContent.slice(0, maxLength);
    }
}

function clearDisplay() {
    display.textContent = '0';
}

function deleteLast() {
    let cursorPos = getCaretPosition(display);
    if (cursorPos > 0) {
        display.textContent = display.textContent.slice(0, cursorPos - 1) + display.textContent.slice(cursorPos);
        setCaretPosition(display, cursorPos - 1);
    }
    if (display.textContent.length === 0) {
        display.textContent = '0';
    }
}

function appendNumber(number) {
    let cursorPos = getCaretPosition(display);
    if (display.textContent === '0') {
        display.textContent = number;
    } else {
        display.textContent = display.textContent.slice(0, cursorPos) + number + display.textContent.slice(cursorPos);
    }
    setCaretPosition(display, cursorPos + 1);
    updateDisplay();
}

function appendOperator(operator) {
    let cursorPos = getCaretPosition(display);
    if (!['+', '-', '*', '/'].includes(display.textContent.slice(-1))) {
        display.textContent = display.textContent.slice(0, cursorPos) + operator + display.textContent.slice(cursorPos);
        setCaretPosition(display, cursorPos + 1);
    }
    updateDisplay();
}

function calculate() {
    try {
        display.textContent = eval(display.textContent).toString();
        updateDisplay();
    } catch {
        display.textContent = 'Error';
    }
}

function getCaretPosition(element) {
    let caretOffset = 0;
    if (window.getSelection) {
        const range = window.getSelection().getRangeAt(0);
        const preCaretRange = range.cloneRange();
        preCaretRange.selectNodeContents(element);
        preCaretRange.setEnd(range.endContainer, range.endOffset);
        caretOffset = preCaretRange.toString().length;
    }
    return caretOffset;
}

function setCaretPosition(element, position) {
    if (element.childNodes.length > 0) {
        const range = document.createRange();
        const sel = window.getSelection();
        let node = element.childNodes[0];
        range.setStart(node, Math.min(position, node.length));
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
    }
}

// Ensure display is always focused to receive input
display.addEventListener('focus', function() {
    const sel = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(display);
    range.collapse(false);
    sel.removeAllRanges();
    sel.addRange(range);
});

// Prevent default behavior of Enter key in contenteditable div
display.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        calculate();
    }
});
