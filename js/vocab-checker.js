var readingStr = 'Share Is Care visit  and  house The three friends and Nono play soccer together It is a warm day Afterwards they are tired  say I tired and hungry  say Me too has candy in his room  go to his room He eats some candy  and  are still outside and  play with Nono  go outside again  doesn’t tell them about the candy He feels a little guilty The next day  and  go to  house They play basketball It is fun They are happy Afterwards they are tired  say I tired and hungry  say Me too  think about yesterday He doesn’t have candy now because he is at  house say I have some candy in my room Do you want candy  and  say Yes please  run to his room He gets candy for his friends run outside  and  smile The three friends eat candy together  feels very guilty now He think Next time I will share with my friends A few day later are at  house After they play  gives them candy Now  is very happy'.toLowerCase();

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

        // console.log(vocabListArr);
        // mammoth.extractRawText...
        var newWordsArr = wordsThatAreNotIn(vocabListArr, readingStr);
    }})
    .done();

});
