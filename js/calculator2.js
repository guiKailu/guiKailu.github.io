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
