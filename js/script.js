$(document).ready(function () {

  // init controller
  var controller = new ScrollMagic.Controller();

  // create a scene
  var scene = new ScrollMagic.Scene({
      duration: 300, // the scene should last for a scroll distance of 100px
      offset: 200 // start this scene after scrolling for 50px
    })
    .setClassToggle("#gallery", "blue")
    .addIndicators()
    .addTo(controller); // assign the scene to the controller

  console.log(scene.triggerElement());

});