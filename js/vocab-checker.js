$(document).ready(function(){
console.log('hi');
  $.ajax({
    url: "data/Vocab_Up_To-EEC3_U3.csv",
    success: function (csvd) {
        data = $.csv.toArrays(csvd);
    },
    dataType: "text",
    complete: function () {
        // call a function on complete
        var vocabList = data.filter(function(d){
          return d[2];
        });
        console.log(vocabList);
    }


});

});

// map through the  data and remove columns one and two.
