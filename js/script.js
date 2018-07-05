var TAGLINE_DELAY = 60;

$(document).ready(function () {

  // init controller
  var controller = new ScrollMagic.Controller();

  // create a scene
  var scene1 = new ScrollMagic.Scene({
      offset: 1
    })
    .setTween(".thumbnail1", {
      width: "90%"
    })
    .addTo(controller);

  var scene2 = new ScrollMagic.Scene({
      offset: 2,
    })
    .setTween("#gallery", {
      marginTop: "50px"
    })
    .addTo(controller);

  var sceneTagline = new ScrollMagic.Scene({
      duration: 88
    })
    .setPin("#tagline")
    .addTo(controller);

  // console.log(scene.triggerElement());
  console.log(scene2);
});