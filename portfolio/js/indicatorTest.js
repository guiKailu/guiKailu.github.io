var controller = new ScrollMagic.Controller({addIndicators: true});

$(document).ready(function(){

  var scene = new ScrollMagic.Scene({
      triggerElement: "#trig"
    })
    // .addIndicators()
    .addTo(controller);
})
