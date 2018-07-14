var readingStr = "Once upon a time, exclamatorial the children went into the woods. There they saw a witch. The witch was mean. They like to laugh and eat candy and dance all day. The end. Have a good day.";

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
    var allWordsArr = allWords.split(' ');

    for (var i = 0; i < allWordsArr.length; i++){
      if (!isThisWordInThere(allWordsArr[i], vcbListArr)){
        newWords.push(allWordsArr[i]);
      }
    }
    console.log(newWords);
  }

  $.ajax({
    url: "data/Vocab_Up_To-EEC3_U3.csv",
    success: function (csvd) {
        data = $.csv.toArrays(csvd);
    },
    dataType: "text",
    complete: function () {
        // call a function on complete
        var vocabListArr = data.map(function(d){
          return d[2];
        });
        // mammoth.extractRawText...
        var newWordsArr = wordsThatAreNotIn(vocabListArr, readingStr);
    }})
    .done();

});
