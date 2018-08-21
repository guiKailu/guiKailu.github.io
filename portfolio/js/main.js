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
