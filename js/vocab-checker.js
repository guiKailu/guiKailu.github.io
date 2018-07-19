var readingStr = 'The kids clap. Wow, you so good at soccer! You so good! Now Jordan has many friends.'.toLowerCase();

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
    url: "data/Vocab_EEC1_to_EEC4U3.csv",
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
