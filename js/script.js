$(document).ready(function () {

  // init controller
  var controller = new ScrollMagic.Controller();

  // create a scene
  var scene = new ScrollMagic.Scene({
      duration: 300, // the scene should last for a scroll distance of 100px
      offset: 20 // start this scene after scrolling for 50px
    })
    .setTween(".thumbnail1", 1.5, {
      width: "90%"
    })
    // .setClassToggle(".thumbnail-img", "thumbnail-img-t")
    .addIndicators()
    .addTo(controller); // assign the scene to the controller


  // $(".thumbnail-img").animate({
  //   width: "90%"
  // }, 6000);


  // console.log(scene.triggerElement());
  console.log(scene);
});