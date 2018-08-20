var clock; //tracks current countdown time in seconds.
var counter = 0; //counts number of clicks until the time is reset with -/+ toggles.
var flag = 0; //inside countdown(), if flag is odd, timer is running, if even, paused.
var countdownId; //for setInterval()
var breaktime = false; //tracks if clock is timing a break or a session.
var targetTime; //records what the current countdown length is.
var audio, muteBtn;
//increment buttons:
var minBrBtn = document.getElementById('minBr');
var plusBrBtn = document.getElementById('plusBr');
var minSesBtn = document.getElementById('minSes');
var plusSesBtn = document.getElementById('plusSes');

function initAudio() {
  audio = new Audio();
  audio.src =
    "https://s3.us-east-2.amazonaws.com/fcc-projects-jms/Pomodoro+Clock/Hero.mp3";
  muteBtn = document.getElementById("muteBtn");
  muteBtn.addEventListener("click", mute);

  function mute() {
    if (audio.muted) {
      audio.muted = false;
      muteBtn.style.background = "url('https://s3.us-east-2.amazonaws.com/fcc-projects-jms/Pomodoro+Clock/Audio-unmute.png') no-repeat center/78%";
      muteBtn.style.opacity = 1;
    } else {
      audio.muted = true;
      muteBtn.style.background = 
      "url('https://s3.us-east-2.amazonaws.com/fcc-projects-jms/Pomodoro+Clock/Audio-mute.png') no-repeat center/102%";
      muteBtn.style.opacity = 0.75;
    }
  }
}

window.addEventListener("load", initAudio);

function reset() {
  clock = 0;
  counter = 0;
  flag = 0;
  countdownId = 0;
}

function setTarget() {
  if (breaktime) {
    targetTime = document.getElementById("break").innerHTML;
  } else {
    targetTime = document.getElementById("ses").innerHTML;
  }
}

function setClock() {
  clock = targetTime;
  clock *= 60;
}

function format(inp) {
  //inputs secs, outputs mm:ss or m:ss.
  var formatted = Math.floor(inp / 60) + ":";
  if (inp % 60 < 10) {
    formatted += "0";
  }
  formatted += inp % 60;
  return formatted;
}

function finishUp() {
  audio.play();
  breaktime = !breaktime; //toggle
  clearInterval(countdownId);
  flag = 0;
  start();
}

function announcePeriod() {
  if (!breaktime && clock / 60 == document.getElementById("ses").innerHTML) {
    document.getElementById("period").innerHTML = "session";
  } else if (
    breaktime &&
    clock / 60 == document.getElementById("break").innerHTML
  ) {
    document.getElementById("period").innerHTML = "BREAK!";
  }
}

function holdit(btn, action, start, speedup, num, brSes) { //lets user hold -/+ buttons
  var t;
  var limiter = 0;
  var origStart = start;
  var repeat = function () {
    limiter++;
    if (limiter === 15){ //prevents length from going to far by accident
      clearTimeout(t);
      start = origStart;
      limiter = 0;
    } else {
    action(num, brSes);
    t = setTimeout(repeat, start);
    start = start / speedup;
    }  
  }
  btn.onmousedown = function(){
    repeat();
  };
  btn.onmouseup = function(){
    clearTimeout(t);
    start = origStart;
    limiter = 0;
  };
  onmouseout = btn.onmouseup;
};

function inc(num, brSes) {
  var v;
  //only toggles if paused or if not on the type of period you're trying to toggle.
  if (
    (brSes === 0 && flag % 2 === 0) ||
    (brSes === 0 && document.getElementById("period").innerHTML == "session")
  ) {
    v = document.getElementById("break").innerHTML;
  } else if (
    (brSes === 1 && flag % 2 === 0) ||
    (brSes === 1 && document.getElementById("period").innerHTML == "BREAK!")
  ) {
    v = document.getElementById("ses").innerHTML;
  } else {
    return; //stop function if conditions aren't met.
  }
  if (num === 1) {
    v++;
  } else if (v > 1) {
    //condition prevents from toggling length to 0 mins or less.
    v--;
  }
  if (brSes === 0) {
    document.getElementById("break").innerHTML = v;
  } else {
    document.getElementById("ses").innerHTML = v;
  }
  if (
    (brSes === 1 && document.getElementById("period").innerHTML == "session") ||
    (brSes === 0 && document.getElementById("period").innerHTML == "BREAK!")
  ) {
    document.getElementById("timer").innerHTML = v + ":00";
    document.getElementById("timer-btn").style.backgroundImage = "linear-gradient(to bottom, transparent 100%, #ffa8d6 100%)";
    reset();
  }
}

function prepButtons(){
  holdit(minBrBtn, inc, 700, 1.4, -1, 0);
  holdit(plusBrBtn, inc, 700, 1.4, 1, 0);
  holdit(minSesBtn, inc, 700, 1.4, -1, 1);
  holdit(plusSesBtn, inc, 700, 1.4, 1, 1);
}

function start() {
  counter++;
  setTarget();
  if (counter === 1) {
    //instantly displays decrement after 1st click
    var x = targetTime - 1;
    document.getElementById("timer").innerHTML = x + ":59";
  } else if (flag % 2 === 0 && flag > 1) {
    //instantly displays decrement when pause ends.
    document.getElementById("timer").innerHTML = format(clock);
    sandClock();
    clock--;
  }
  //if flag is odd, run clock, if even, pause.
  flag++;
  if (flag % 2 === 1) {
    //if countdown just started running
    if (flag === 1) {
      //if just starting a fresh countdown, with no pauses yet.
      setClock(); //set clock to targetTime * 60.
      if (counter === 1) {
        //instant decrement clock twice after 1st click
        clock--;
        sandClock();
        clock--;
      }
    }
    countdownId = 0;
    //Start clock
    countdownId = setInterval("countdown()", 1000);
  }
}

function sandClock() {
  var color;
  if (breaktime) {
    color = "#ffa8d6 ";
  } else {
    color = "#b5ffd7 ";
  }
  var percentLeft = clock / (targetTime * 60) * 100;
  document.getElementById("timer-btn").style.backgroundImage = "linear-gradient(to bottom, transparent " +
    percentLeft +
    "%," +
    color +
    percentLeft +
    "%, lightblue 100%)";
}

function countdown() {
  if (flag % 2 === 1) {
    //condition prevents it from filling after paused
    sandClock(); //fills circle every second
  }
  announcePeriod(); //session or break now?

  if (clock > 0 && flag % 2 === 1) {
    //if running
    document.getElementById("timer").innerHTML = format(clock);
    clock--;
  } else if (clock > 0 && flag % 2 === 0) {
    //if paused
    clearInterval(countdownId);
  }
  if (clock === 0) {
    //when countdown finishes
    finishUp();
  }
}
window.eventlistener('load', prepButtons());