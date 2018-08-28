var i = 0;

var colors = ["#fafafa", "black", "#f5f5f5"];

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

    // add [amount] gallery items to page
    for (var a = 0; a < amount; a++){

      // stop code when user reaches bottom of page
      if (data["gallery-items"][i]){
        $("<div>")
          .addClass("gallery-item")
          .css('backgroundColor', function(){
            return colors[i % colors.length];
          })
          .addClass(function(){
            if (colors[i % colors.length] === "black"){
              return "black";
            }
          })
          .html(function(){
            // Add screenshot of website
            var thumbnail = '<div class="thumbnail">';
            // With link to that website
            thumbnail += '<a href="' + data["gallery-items"][i].demoUrl;
            thumbnail += '" target="_blank"><div class="centered-img"><img class="thumbnail-img" src="';
            thumbnail += data["gallery-items"][i].img;
            thumbnail += '" alt=""></div></a></div>';

            // Add info about the website
            var info = '<div class="item-info"><a class="gitHub" href="';
            // With link to the code on github
            info += data["gallery-items"][i].codeUrl + '" target="_blank">';
            // Github logo for code link
            info += '<img src="img/GitHub-Mark-32px.png" alt="Github logo">';
            info += '<span class="seeCode">See code</span></a><div>';
            for (var j = 0; j < data["gallery-items"][i].info.length; j++){
              info += '<p>' + data["gallery-items"][i].info[j] + '<p>';
            }
            info += '</div></div></div>';
            return thumbnail + info;
          })
          .appendTo(".dynamicContent #gallery");
          i++;
        }
      }
    i--;
  })
  // loading done -> revert to normal state
  .done(function(){
    scene.update(true); //make sure the scene gets the new start position
    $("#loader").removeClass("active");
    i++;
  });
}

var controller = new ScrollMagic.Controller(
  // indicators for debugging scrolling issues
  // {addIndicators: true}
);

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
