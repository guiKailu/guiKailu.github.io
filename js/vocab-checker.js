var readingStr = 'Today is Thanksgiving. The family is in the house—grandpa, grandma, mommy, daddy, Amy, Nick, Nick’s friend Civa, and Nono. Everybody is happy.Mommy and daddy cook turkey. They also cook sweet potatoes and pumpkin pie. Amy likes pumpkin pie. It’s very good. Nono runs into the kitchen. She likes turkey. Amy says, “No! Nono, you can’t do that.”Grandma and Nick play chess in the living room. They like chess. Whose turn is it? It’s Nick’s. Nono runs into living room. She likes to run. She runs into the chess game. Amy says, “Oh no! Nono, you can’t do that.” Grandpa sleeps on the sofa. Grandpa likes to sleep. Does Grandpa have a blanket? Yes, he does. Nono runs onto the sofa. Nono runs onto Grandpa’s belly. Amy says, “No! Nono, you can’t do that.” Everybody is hungry. It’s time to eat. Everybody sits at the table—everybody except Nono. Everybody eats turkey and sweet potatoes. Everybody likes the food. Where’s Nono? Nono is next to Amy’s chair. Nono is hungry too. Nono likes to eat. Amy says, “Okay, here is turkey for you. Happy Thanksgiving Nono!”'.toLowerCase();

var PUNCTUATION = /,|\./g;

$(document).ready(function(){


  function isThisWordInThere(word, vList){
    var regex = RegExp(word);
    var listOfVocabulary = vList.join(' ');
    return regex.test(listOfVocabulary) ? true : false;
  }

  function wordsThatAreNotIn(vcbListArr, rdngStr){
    var newWords = []; //array to store all the words from the reading that aren't in the vocab list.
    var allWords = rdngStr.replace(PUNCTUATION, ''); //removes  punctuation from the reading.
    console.log(allWords);
    var allWordsArr = allWords.split(' ');

    for (var i = 0; i < allWordsArr.length; i++){
      if (!isThisWordInThere(allWordsArr[i], vcbListArr)){
        newWords.push(allWordsArr[i]);
      }
    }
    console.log(newWords);
  }

  $.ajax({
    url: "data/Vocab_Up_To-EEC3.csv",
    success: function (csvd) {
        data = $.csv.toArrays(csvd);
    },
    dataType: "text",
    complete: function () {
        // call a function on complete
        var vocabListArr = data.map(function(d){
          return d[2].toLowerCase();
        });
        // mammoth.extractRawText...
        var newWordsArr = wordsThatAreNotIn(vocabListArr, readingStr);
    }})
    .done();

});
