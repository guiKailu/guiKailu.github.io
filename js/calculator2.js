// It only needs to remember the total
// and the current number
// and the current operator
// and whether it's time for an operator or for a number
var total;
// track whether input can be a number or an operator
// if true, it should be a number
var flag = true;

function btn(e){
  var btn = e.srcElement.defaultValue;
  calculate(btn);
}

function key(e){
  var btn = e.key;
  calculate(btn);
}

function calculate(b){
  

  document.getElementById("display").innerHTML = b;
}
