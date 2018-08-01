var total = 0;
var operators = /\+|\-|\/|\*|=/g;
var numbers = /\d/;
var subtotal;
var entries = [];

function resetButtons() {
  var b = document.getElementsByTagName("button");
  for (var c in b) {
    b[c].style = "background-color: #fbbd1e;";
  }
}

function highlightOperator(operator) {
  resetButtons();
  if (operator.match(/\+/)) {
    document.getElementById("plus").style = "background-color: #c9ddff;";
  } else if (operator.match(/\-/)) {
    document.getElementById("minus").style = "background-color: #c9ddff;";
  } else if (operator.match(/\//)) {
    document.getElementById("divide").style = "background-color: #c9ddff;";
  } else if (operator.match(/\*/)) {
    document.getElementById("multiply").style = "background-color: #c9ddff;";
  }
}

function writeToBox(whatToWrite) {
  highlightOperator(whatToWrite);
  var whatsThere = document.getElementById("calcInput").value;

  if (document.getElementById("calcInput").value) {
    var boxValue = document.getElementById("calcInput").value;
    boxValue += whatToWrite;

    if (
      whatToWrite === "." ||
      (whatToWrite.match(numbers) && !whatsThere.match(operators))
    ) {
      document.getElementById("calcInput").value = boxValue;
    } else {
      display(boxValue);
    }
  } else {
    document.getElementById("calcInput").value = whatToWrite;
    if (entries[entries.length - 1] == "=" && whatToWrite.match(operators)) {
    }
  }
}

function percent() {
  var decimal = document.getElementById("calcInput").value;
  document.getElementById("calcInput").value = decimal * 0.01;
}

function final(event) {
  //"enter" activates "=" when input box is active
  if (event.which === 13 || event.keyCode === 13) {
    clickIt();
  }
}

function clickIt() {
  var y = document.getElementById("calcInput").value;
  document.getElementById("calcInput").value = y + "=";
  display(document.getElementById("calcInput").value);
  document.getElementById("calcInput").value = "";
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
  document.getElementById("calcInput").value = "";
  document.getElementById("result").innerHTML = 0;
  resetButtons();
}

function ce() {
  //set a variable equal to the value of the entry field.
  var ceField = document.getElementById("calcInput").value;
  var isOperator = ceField.match(operators);
  //set that variable equal to itself minus the last ch.
  ceField = ceField.slice(0, -1);
  //set value of entry field to that variable.
  document.getElementById("calcInput").value = ceField;

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
    var pureNumber = inp.split(""); //store number without operators
    pureNumber.splice(match, 1);
    num = pureNumber.join("");
    num = parseFloat(num);
  }

  if (num && inp.match(operators) && match !== 0) {
    entries.push(num);
    document.getElementById("calcInput").value = inp.match(operators);
  }

  if (num && inp.match(operators) && match === 0) {
    if (inp.match(operators) !== "=") {
      entries.push(inp.match(operators));
    }
    if (num < 0) {
      num *= -1;
    }
    document.getElementById("calcInput").value = num;
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

    if (document.getElementById("calcInput").value == "=") {
      document.getElementById("calcInput").value = "";
    }
  }
}


$(document).ready(function(){
  $("#divide").html("&#247");

});
