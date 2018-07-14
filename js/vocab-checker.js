$(document).ready(function(){

  $.ajax({
    url: "data/Vocab_Up_To-EEC3_U3.csv",
    success: function (csvd) {
        data = $.csv.toArrays(csvd);
    },
    dataType: "text",
    complete: function () {
        // call a function on complete
        var vocabList = data.map(function(d){
          return d[2];
        });
        console.log(vocabList);

        mammoth.extractRawText({path: "data/CC_Test_Story.docx"})
        .then(function(result){
        var text = result.value;
        console.log(text);
        var messages = result.messages;
    })
    .done();

    }
  });
});

// readFileInputEventAsArrayBuffer() is from Mammoth.js
// function readFileInputEventAsArrayBuffer(event, callback) {
//     var file = event.target.files[0];
//
//     var reader = new FileReader();
//
//     reader.onload = function(loadEvent) {
//         var arrayBuffer = loadEvent.target.result;
//         callback(arrayBuffer);
//     };
//
//     reader.readAsArrayBuffer(file);
// }

// map through the  data and remove columns one and two.

function readFileInputEventAsArrayBuffer(event, callback) {
    var file = event.target.files[0];

    var reader = new FileReader();

    reader.onload = function(loadEvent) {
        var arrayBuffer = loadEvent.target.result;
        callback(arrayBuffer);
    };

    reader.readAsArrayBuffer(file);
}
