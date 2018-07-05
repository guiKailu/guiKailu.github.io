$(document).ready(function () {
  $("#getMessage").on("click", function () {
    $.getJSON(
      "https://random-quote-generator.herokuapp.com/api/quotes/",
      function (data) {

        var html = "";

        var randomID = Math.floor(Math.random() * (data.length - 1));

        //catches any undefined authors or quotes, and replaces them with a complete entry.
        while (data[randomID].author == undefined || data[randomID].quote == undefined) {
          randomID = Math.floor(Math.random() * (data.length - 1));
        }


        html += "<div>" + data[randomID].quote + "</div><br>";

        html += "<div>" + "—" + data[randomID].author + "</div><br>";

        //sends quote to html
        $(".message").html(html);

        //initiates URL for tweet and replaces semicolons and plus signs with the html url code.
        var quoteString = data[randomID].quote.replace(/\;/g, "%3B");
        quoteString = quoteString.replace(/\+/g, "%2B");

        //adds the quote, author, and, if applicable, date to the URL.
        quoteString += " - ";
        quoteString += data[randomID].author;
        var arr = quoteString.split(" ");
        quoteString = arr.join("%20");
        var tweetHtml = "";
        tweetHtml += "https://twitter.com/intent/tweet?url=";
        //adds this code pen website url to the tweet.
        tweetHtml +=
          "https%3A%2F%2Fcodepen.io%2Fjanshe%2Ffull%2FZxMJEQ%2F;text=";
        tweetHtml += quoteString;
        //adds twitter account name.
        tweetHtml += "%20%40janmarkshe";
        //sends the appropriate tweet url to the twitter button each time the quote button is clicked.


        //only shows twitter icon once a quote shows:
        $("#tweet-classy").html('<a href="' + tweetHtml + '" target="_blank"><button class="btn btn-primary"> <i class="fa fa-twitter"></i> Tweet this!</button></a>');

        //when button is clicked, reflect that:
        $("#getMessage").html("Another One!");

      }
    );
  });
});
//now find out why there is still one undefined result.