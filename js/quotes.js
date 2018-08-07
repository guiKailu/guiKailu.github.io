function getMessage(){

  $.getJSON(
    "data/quotes.json",
    function (data) {

      var html = "";

      var randomID = Math.floor(Math.random() * (data.quotes.length - 1));

      //catches any undefined authors or quotes, and replaces them with a complete entry.
      while (data.quotes[randomID].author == undefined || data.quotes[randomID].quote == undefined) {
        randomID = Math.floor(Math.random() * (data.quotes.length - 1));
      }

      html += "<div>" + data.quotes[randomID].quote + "</div>";

      html += "<div>" + "—" + data.quotes[randomID].author + "</div>";

      //sends quote to html
      $(".message").html(html);

      //initiates URL for tweet and replaces symbols with the html url code.
      var quoteString = data.quotes[randomID].quote
        .replace(/%/g, "%25")
        .replace(/;/g, "%3B")
        .replace(/\+/g, "%2B");

      //adds the quote, author, and, if applicable, date to the URL.
      quoteString += " - ";
      quoteString += data.quotes[randomID].author;

      var arr = quoteString.split(" ");
      quoteString = arr.join("%20");
      var tweetHtml = "";
      tweetHtml += "https://twitter.com/intent/tweet?url=";
      //adds this code pen website url to the tweet.
      tweetHtml +=
        "https%3A%2F%2Fcodepen.io%2Fjanshe%2Ffull%2FZxMJEQ%2F;text=";
      tweetHtml += quoteString;
      //adds twitter account name.
      tweetHtml += "%20%40yannstoneman";
      //sends the appropriate tweet url to the twitter button each time the quote button is clicked.

      //only shows twitter icon once a quote shows:
      $("#tweet-classy").html('<a href="' + tweetHtml + '" target="_blank"><button class="btn"> <i class="fa fa-twitter"></i> Tweet this!</button></a>');

      //when button is clicked, reflect that:
      $("#getMessage").html("Another One!");

    });

}
