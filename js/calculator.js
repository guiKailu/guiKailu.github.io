// final result of all operations
var total = 0;
// five operators
var operators = /\+|-|\/|\*|=/g;
// four operators
var operators4 = /\+|-|\/|\*/g;
// all numbers
var numbers = /\d/;
// decimal point
var decimal = /\./;
// Array to keep track of all buttons pressed since the last AC.
var entries = [];

var ADDITION = "+";
var SUBTRACTION = "-";
var MULTIPLICATION = "*";
var DIVISION = "/";

// Make sure the user isn't selecting "equals" at an invalid point in the equation
function checkInput(selectedButton) {
  console.log(entries.length);
  var topBox = document.getElementById("topBox").value;

  if (
    // If the input is an equals sign, make sure it's after a number, an operator, and a number.
    (selectedButton === "=" && entries.length % 2 === 1 && entries.length > 1)
    // If the input is an operator,
  || topBox.match(numbers)
  || entries.length % 2 === 0 && selectedButton.match(operators4)
  || selectedButton.match(numbers)){

    writeToBox(selectedButton);
  } else {
    // flash the top box with the same value as before
  }
}

// When a button is clicked,
// show it in the top box.
function writeToBox(btn){
  // First highlight the selected button
  if (btn.match(operators)){
    highlightOperator(btn);
  }
  // Save what's currently displayed in the top box.
  var currentTopBoxVal = document.getElementById("topBox").value;

  // If something's displayed in the top box, then proceed
  if (currentTopBoxVal) {

    var updatedTopBoxVal = currentTopBoxVal + btn;

    if (
      // if the selection is a decimal point, and there isn't yet a decimal point
      (btn === "." && !currentTopBoxVal.match(decimal)) ||
      // or if the selection is a number
      (btn.match(numbers)
      // AND the current value displayed in the top box is not an operator
      && !currentTopBoxVal.match(operators))
    ) {
      // Display the updated value in the top box
      document.getElementById("topBox").value = updatedTopBoxVal;
      // If there's already a decimal point,
      // and the user selects it again,
      // stop running the function
    } else {
      display(updatedTopBoxVal);
    }
  }
  // If nothing's in the top box yet,
  // give it the value of the selected button
  else if (entries.length === 0){
    document.getElementById("topBox").value = btn;
  } else if (btn.match(operators)){
    // Else if it's an operator, display that operator
    document.getElementById("topBox").value = btn;
  }
}

function checkForEnter(inp){
    return inp === 13 ? true : false;
}

// Accept keyboard input
function keyboard(event) {

  // Save character code
  var entry = checkForEnter(event.keyCode) ?
    "=" : String.fromCharCode(event.charCode);

  // If it's a number, decimal point, or operator,
  if (entry.match(numbers) || entry.match(decimal) || entry.match(operators)){
    checkInput(entry);
  } else if (entry.match(/c/i)){
    // If it's a c, clear the calculator
    ac();
  }
}

// Get result
function equals() {
  var y = document.getElementById("topBox").value;
  y+= "=";
  display(y);
  // Clear top box. Result will show in bottom box.
  y = "";
}

// If the percent button is pressed
function percent() {
  var topBox = document.getElementById("topBox");
  // Multiply the number displayed in the top box by 1 percent.
  // and then display the result in the same box.
  topBox.value *= 0.01;
}

// Reset all data
// when AC is clicked
// or 'c' is entered
function ac() {
  total = 0;
  entries = [];
  document.getElementById("topBox").value = "";
  document.getElementById("result").innerHTML = 0;
  resetButtons();
}

// Go back one step.
function ce() {
  //set a variable equal to the value of the entry field.
  var ceField = document.getElementById("topBox").value;
  var isOperator = ceField.match(operators);
  //set that variable equal to itself minus the last ch.
  ceField = ceField.slice(0, -1);
  //set value of entry field to that variable.
  document.getElementById("topBox").value = ceField;

  // if the last entry was an operator
  if (isOperator) {
    // reset buttons
    resetButtons();
  }
}

// Remove operator from input
// And return just the number.
// 'dirt' is the index at which the operator is at.
function cleanNumber(dirt, numberString){
  var num = numberString.split("");
  num.splice(dirt, 1);
  num = num.join("");
  num = parseFloat(num);
  return num;
}

// Take user input, update top box and entries array.
function displayTopBox(inp){
  // store which index that operator is at.
  var operatorIndex = operators.exec(inp).index;
  // Remove operator from number input
  var num = cleanNumber(operatorIndex, inp);
  // If the first number in the input is a number
  if (operatorIndex !== 0) {
    // add that number to the entries array
    entries.push(num);
    // and display only the operator
    document.getElementById("topBox").value = inp.match(operators);
  } else {
    if (inp.match(operators) !== "=") {
      // otherwise, add the operator to the entries array,
      entries.push(inp.match(operators));
    }
    // preserve negatives,
    if (num < 0) {
      num *= -1;
    }
    // and show the number.
    document.getElementById("topBox").value = num;
  }
}

// Creates results message for bottom box
// Looks like "5 + 3 * 2 = 16"
// (It can be read from left to right, not by the order of operations)
function makeResultString(){
  var str = "";
  for (var i = 0; i < entries.length; i++) {
    str += " " + entries[i];
  }
  str += " = " + total;
  return str;
}

// Fix js floating point weirdness
function improveFloat(num){
  improved = num.toFixed(8);
  improved *= 100000000;
  improved /= 100000000;
  return improved;
}

// Perform the actual operation
function calculate(){
  total = entries[0];
  for ( var j = 1;
    j < entries.length && entries.length % 2 === 1 && entries.length > 2; j += 2) {

    // number to add/multiply/etc to total
    var arg = parseFloat(entries[j+1]);
    // operator
    var op = entries[j] + '';

    switch (op){
      case ADDITION:
        total += arg;
        break;
      case SUBTRACTION:
        total -= arg;
        break;
      case MULTIPLICATION:
        total *= arg;
        break;
      case DIVISION:
        total /= arg;
    }
    total = improveFloat(total);
  }
}

// Update bottom box.
// The bottom box shows the results of calculations.
function displayBottomBox(){

  // if there's at least two arguments and an operator...
  if (entries.length >= 3 && entries.length % 2 === 1) {
    // show the result in the bottom box (id=result)
    document.getElementById("result").innerHTML = makeResultString();

    // wiggle the bottom box to emphasize the results
    // since some calculators show the results on the top
    wiggle();

    var topBox = document.getElementById("topBox");
    // clear the top box if there's an equals sign in it
    if (topBox.value == "=") topBox.value = "";
  }
}

function display(inp) {
  // Take user input, update top box and entries array.
  displayTopBox(inp);

  // Add/subtract/etc the updated elements of the entries array.
  calculate();

  // Update bottom box.
  // The bottom box shows the results of calculations.
  displayBottomBox();
}

// Add divide symbol to document on load.
// It's added seperately because of a glitch with the Atom code editor
document.addEventListener("DOMContentLoaded", function(){
  document.getElementById("divide").innerHTML = "&#247";
});

// **************************
// ***APPEARANCE FUNCTIONS***
// **************************

// Set all buttons to their default background color
function resetButtons() {
  // Select all buttons
  var b = document.getElementsByTagName("button");
  // loop through all buttons
  for (var c in b) {
    b[c].style = "background-color: #fbbd1e;";
  }
}

// Highlight operator button, when selected,
// by changing its background color from yellow to blue
function highlightOperator(operator) {
  var selectedOperatorBgColor = "background-color: #c9ddff;";
  // First set all buttons to default color
  resetButtons();

  switch(operator.match(operators)[0]){
    case ADDITION:
      document.getElementById("plus").style = selectedOperatorBgColor;
      break;
    case SUBTRACTION:
      document.getElementById("minus").style = selectedOperatorBgColor;
      break;
    case MULTIPLICATION:
      document.getElementById("multiply").style = selectedOperatorBgColor;
      break;
    case DIVISION:
      document.getElementById("divide").style = selectedOperatorBgColor;
    }
  }

// Gently shake bottom box when answer is calculated.
function wiggle() {
  var d = document.getElementById("result");
  // Add 'enabled' class, so that it shakes.
  d.className = "enabled result col";

  // remove 'enabled' class after 1 second,
  // so that it's ready to shake next 'equals'
  setTimeout(function() {
    d.className = "result col";
  }, 1000);
}
