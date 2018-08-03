var readingStr = 'I’m Nick. And this is my friend Civa. He is a robot. Civa goes to school with me. We play together. It is winter. It snows outside. I have a big blue jacket. The jacket is warm. Amy has a green sweater. She is not cold. Civa does not have clothing. Robots do have clothing. Grandma says, Civa! You can play in the snow. It cold. You do have a sweater. Civa says, Robots do wear sweaters! Civa plays with Amy and Nick. Nono jumps in the snow too. The snow is white. They are happy. The next day, Amy and Nick eat breakfast. Where is Civa? Civa in bed. He has the flu? Who? Civa has the flu? Civa sneezes: Achoo. ACHOOOO. ACHO01010001110111000001! Amy says, Robots do get the flu! Nick laughs. He says, Civa is a special robot. Grandma makes a red sweater for Civa. She says, Robots do wear sweaters. But Civa is a special robot. Five days later, Civa is healthy again. Grandma says, This sweater is for you. Civa laughs and says, Robots do wear sweaters. But I’m a special robot! Civa, Nick, Amy, and Nono play in the snow. Civa wears the red sweater.'.toLowerCase();

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
    url: "data/EECS_Book_1and2.csv",
    success: function (csvd) {
        data = $.csv.toArrays(csvd);
    },
    dataType: "text",
    complete: function () {
        // call a function on complete
        var vocabCellArr = data.map(function(d){
          return d[2].toLowerCase();
        });
        var vocabListArr = [];
        for (var i = 0; i < vocabCellArr.length; i++){
          var tempArr = vocabCellArr[i].split(/\s|\W/);
          for (var j = 0; j < tempArr.length; j++){
            if (tempArr[j].length > 2 && !/\d/.test(tempArr[j]) ) {
              vocabListArr.push(tempArr[j].replace(/\W/i, ""));
            }
          }
        }

        console.log(vocabListArr);
        // mammoth.extractRawText...
        var newWordsArr = wordsThatAreNotIn(vocabListArr, readingStr);
    }})
    .done();

});
