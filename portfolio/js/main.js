var i = 0;

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
  $("#seeMoreBtn").show();
}

function showMore(){
  var text = $("#seeMoreBtn>button").text();
  if (text == "Expand more demos"){
    $("#gallery2").show()
      .animate({
      opacity: "1"
    }, 1000);
    $("#seeMoreBtn>button").text("See less");
    $("#seeMoreBtn").insertAfter("#gallery2");

    $("#toolkit").animate({
      paddingBottom: 0,
      marginBottom: 0
    }, 1000);
  } else {
    $("#seeMoreBtn").insertBefore("#toolkit");
    $("#gallery2").animate({
      opacity: 0
    }, 1000).hide();
    $("#seeMoreBtn>button").text("Expand more demos");

    $("#toolkit").animate({
      paddingBottom: 0,
      marginBottom: 0
    }, 1000);
  }
}

function addGalleryItems(amount){
  $.getJSON("data.json", function(data){
    // console.log(data["gallery-items"][0].codeUrl);
    $("<div>")
      .addClass("gallery-item")
      .html(function(){
        var html = '<div class="thumbnail">';
        html += '<a href="' + data["gallery-items"][0].demoUrl;
        html += '" target="_blank"><div class="centered-img"><img class="thumbnail-img" src="';
        html += data["gallery-items"][i].img;
        html += '" alt=""></div></a></div>';
        return html;
      })
      .appendTo(".dynamicContent #gallery");
  })
  // loading done -> revert to normal state
  .done(function(){
    scene.update(true); //make sure the scene gets the new start position
    $("#loader").removeClass("active");
    i++;
  });
}

// init controller
var controller = new ScrollMagic.Controller({addIndicators: true});

var scene = new ScrollMagic.Scene({
  triggerElement: "#loader",
  triggerHook: "onEnter"
});

$(document).ready(function(){
  // build scene
    scene.addTo(controller)
    .on("enter", function () {
      if (!$("#loader").hasClass("active")){
        $("#loader").addClass("active");
        if (console){
          console.log("loading new items");
        }
        addGalleryItems(2);
      }
    });
})
