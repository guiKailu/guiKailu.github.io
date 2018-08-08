// final result of all operations
var total = 0;
// five operators
var operators = /\+|-|\/|\*|=/g;
// all numbers
var numbers = /\d/;
// decimal point
var decimal = /\./;
var subtotal;
// Array to keep track of all buttons pressed
// since the last AC press.
var entries = [];

var selectedOperatorBgColor = "background-color: #c9ddff;";

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
  // First set all buttons to default color
  resetButtons();
  // Plus
  if (operator.match(/\+/)) {
    document.getElementById("plus").style = selectedOperatorBgColor;
  // Minus
  } else if (operator.match(/-/)) {
    document.getElementById("minus").style = selectedOperatorBgColor;
  // Divide
  } else if (operator.match(/\//)) {
    document.getElementById("divide").style = selectedOperatorBgColor;
  // Multiply
  } else if (operator.match(/\*/)) {
    document.getElementById("multiply").style = selectedOperatorBgColor;
  }
}

// When a number or operator is clicked,
// show it in the top box.
function writeToBox(selectedButton) {
  // First highlight the selected button
  if (selectedButton.match(operators)){
    highlightOperator(selectedButton);
  }
  // Save what's currently displayed in the top box.
  var currentTopBoxVal = document.getElementById("topBox").value;

  // If something's displayed in the top box, then proceed
  if (currentTopBoxVal) {

    var updatedTopBoxVal = currentTopBoxVal + selectedButton;

    if (
      // if the selection is a decimal point, and there isn't yet a decimal point
      (selectedButton === "." && !currentTopBoxVal.match(decimal)) ||
      // or if the selection is a number
      (selectedButton.match(numbers)
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
    document.getElementById("topBox").value = selectedButton;
  } else if (selectedButton.match(operators)){
    // Else if it's an operator, display that operator
    document.getElementById("topBox").value = selectedButton;
  }
}

// If the percent button is pressed
function percent() {
  var topBox = document.getElementById("topBox");
  // Multiply the number displayed in the top box by 1 percent.
  // and then display the result in the same box.
  topBox.value *= 0.01;
}

function final(event) {
  //"enter" activates "=" when input box is active
  // if (event.which === 13 || event.keyCode === 13) {
  //   clickIt();
  // }

  var entry = String.fromCharCode(event.charCode);
  console.log(entry);
  if (entry.match(numbers) || entry.match(decimal) || entry.match(operators)){
    writeToBox(entry);
  }

}

function clickIt() {
  var y = document.getElementById("topBox").value;
  document.getElementById("topBox").value = y + "=";
  display(document.getElementById("topBox").value);
  document.getElementById("topBox").value = "";
}

function wiggle() {
  var d = document.getElementById("result");
  d.className = "enabled result col";

  setTimeout(function() {
    d.className = "result col";
  }, 1000);

}

function calc() {
  document.getElementById("result").innerHTML = total;
}

function ac() {
  total = 0;
  entries = [];
  document.getElementById("topBox").value = "";
  document.getElementById("result").innerHTML = 0;
  resetButtons();
}

function ce() {
  //set a variable equal to the value of the entry field.
  var ceField = document.getElementById("topBox").value;
  var isOperator = ceField.match(operators);
  //set that variable equal to itself minus the last ch.
  ceField = ceField.slice(0, -1);
  //set value of entry field to that variable.
  document.getElementById("topBox").value = ceField;

  if (isOperator) {
    resetButtons(); //only resetButtons if the last entry was an operator
  }
}

function display(inp) {
  var sum;
  var num = parseFloat(inp);
  var match;

  if (inp.match(operators)) {
    match = operators.exec(inp).index;
    // store number without operators
    var pureNumber = inp.split("");
    pureNumber.splice(match, 1);
    num = pureNumber.join("");
    num = parseFloat(num);
  }

  if (num && inp.match(operators) && match !== 0) {
    entries.push(num);
    document.getElementById("topBox").value = inp.match(operators);
  }

  if (num && inp.match(operators) && match === 0) {
    if (inp.match(operators) !== "=") {
      entries.push(inp.match(operators));
    }
    if (num < 0) {
      num *= -1;
    }
    document.getElementById("topBox").value = num;
  }

  var resultHTML = entries[0];
  for (var i = 1; i < entries.length; i++) {
    resultHTML += " " + entries[i];
  }

  resultHTML += " =";

  subtotal = entries[0];
  for (
    var j = 1;
    j < entries.length && entries.length % 2 === 1 && entries.length > 2;

  ) {
    if (entries[j] == "+") {
      total = subtotal + parseFloat(entries[j + 1]);
    } else if (entries[j] == "-") {
      total = subtotal - parseFloat(entries[j + 1]);
    } else if (entries[j] == "*") {
      total = subtotal * parseFloat(entries[j + 1]);
    } else if (entries[j] == "/") {
      total = subtotal / parseFloat(entries[j + 1]);
    }
    total = total.toFixed(8);
    total *= 100000000;
    total /= 100000000;
    subtotal = total;
    j += 2;
  }
  resultHTML += " " + total;
  if (entries.length >= 3 && entries.length % 2 === 1) {
    document.getElementById("result").innerHTML = resultHTML;

    wiggle();

    if (document.getElementById("topBox").value == "=") {
      document.getElementById("topBox").value = "";
    }
  }
}

$(document).ready(function(){
  $("#divide").html("&#247");

});
