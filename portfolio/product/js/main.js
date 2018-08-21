function submitMessage(){
  $("#alertMsg").empty();
  var alertMsg = "<div id='alertMsg' style='color: #5923e4'>Actually, you can get a couple twigs at your local forest for free.</br>We didn't save your email address.</div>";
  $("#form").after(alertMsg);
  $("#email").val("");
}
