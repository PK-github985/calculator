function appendToDisplay(value) {
    var display = document.getElementById('display');
    display.value += value;
    display.focus(); // Set focus back to display after button click
}

function clearDisplay() {
    document.getElementById('display').value = '';
}

function calculate() {
    let result = eval(document.getElementById('display').value);
    document.getElementById('display').value = result;
}

function backspace() {
    let displayValue = document.getElementById('display').value;
    document.getElementById('display').value = displayValue.slice(0, -1);
}

function clearText() {
    var screen = document.getElementById('screen');
    screen.innerHTML = '<input type="text" id="display" readonly onclick="clearText();" onfocus="this.select();" value="">';
    var display = document.getElementById('display');
    display.focus();
}
