var TAGLINE_DELAY = 60;

function showGallery(){
  $("#gallery").show()
    .animate({
    opacity: "1"
  }, 1000);
  $("#description").animate({
    paddingBottom: 0
  }, 1000);
  $("#portfolioBtn").hide();
  $("#description :last-child").animate({
    marginBottom: 0
  }, 1000);
  $("#toolkit").css("paddingTop", 0);
}

function showMore(){
  // Make it togglable
  $("#gallery2").show()
    .animate({
    opacity: "1"
  }, 1000);
  $("#seeMoreBtn :child").text("See less");
  $("#toolkit").animate({
    paddingBottom: 0,
    marginBottom: 0
  }, 1000);

  // $("#contact").css("paddingTop", 0);
}


$(document).ready(function () {

  // // init controller
  // var controller = new ScrollMagic.Controller();
  //
  // // create a scene
  // var scene1 = new ScrollMagic.Scene({
  //     offset: 1
  //   })
  //   .setTween(".thumbnail1", {
  //     width: "90%"
  //   })
  //   .addTo(controller);
  //
  // var scene2 = new ScrollMagic.Scene({
  //     offset: 2,
  //   })
  //   .setTween("#gallery", {
  //     marginTop: "50px"
  //   })
  //   .addTo(controller);
  //
  // var sceneTagline = new ScrollMagic.Scene({
  //     duration: 88
  //   })
  //   .setPin("#tagline")
  //   .addTo(controller);
  //
  // var slowGallery = new ScrollMagic.Scene({
  //     offset: 20,
  //     duration: 200
  //   })
  //   .setPin("#gallery")
  //   .addTo(controller);
  //
  // // console.log(scene.triggerElement());
  // // console.log(scene2);
});
