var margin = {
  left: 100,
  right: 10,
  top: 10,
  bottom: 100
};

var width = 700 - margin.left - margin.right;
var height = 500 - margin.top - margin.bottom;

var g = d3.select("#chart-area")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom);

var x = d3.scaleLinear()
  .range([0, width]);

// var y = d3.scaleLinear()
//   .domain()
//   .range();

d3.json("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json").then(function(data){

  // x.domain([0, d3.max(function(d){
  //   return d.
  // })]);
  console.log(data.data);

});










// var w = 700;
// var h = 500;
// var padding = 50;
//
// function doD3stuff(rawdata) {
//   //converts years to floats:
//   var dataset = rawdata.map(function (val) {
//     var year = val[0].match(/\d{4}/);
//     var month = val[0].match(/\D\d{2}\D/)[0].match(/\d+/);
//     var mon = void 0;
//     switch (parseInt(month)) {
//       case 1:
//         mon = 0;
//         break;
//       case 4:
//         mon = 0.25;
//         break;
//       case 7:
//         mon = 0.5;
//         break;
//       case 10:
//         mon = 0.75;
//         break;
//     }
//     return [parseInt(year) + mon, val[1]];
//   });
//
//   //EDIT THIS LATER TO BE THE DATE
//   var xScale = d3.scaleLinear().domain([d3.min(dataset, function (d) {
//     return d[0];
//   }), d3.max(dataset, function (d) {
//     return d[0];
//   })]).range([padding, w - padding]);
//   var yScale = d3.scaleLinear().domain([0, d3.max(dataset, function (d) {
//     return d[1];
//   })]).range([h - padding, padding]);
//
//   var svg = d3.select("body").append("svg").attr("width", w).attr("height", h);
//
//   svg.selectAll("rect")
//     .data(dataset)
//     .enter()
//     .append("rect")
//     .attr("x", function (d) {
//       return xScale(d[0]);
//     })
//     .attr("y", function (d) {
//       return yScale(d[1]);
//     }) //here
//     .attr("width", 1).attr("height", function (d) {
//       return h - yScale(d[1]) - padding;
//     }) //or here
//     .attr("class", "bar").attr("fill", "#0000CC").attr('data-date', function (d) {
//       var Q = void 0;
//       if (d[0] % 1 === 0) {
//         Q = 1;
//       } else if (d[0] % 1 === 1) {
//         Q = 2;
//       } else if (d[0] % 1 === 2) {
//         Q = 3;
//       } else if (d[0] % 1 === 3) {
//         Q = 4;
//       }
//       return d[0] % 1 + " Q" + Q;
//     }).attr("data-gdp", function (d) {
//       return d[1];
//     });
//
//   svg.selectAll("rect")
//     .data(dataset)
//       .enter()
//       .append("title")
//       .text("hi");
//
//   var xAxis = d3.axisBottom(xScale);
//
//   svg.append("g")
//     .attr("transform", "translate( 0, " + (h - padding) + ")")
//     .call(xAxis)
//     .attr("id", "x-axis");
//   //Both axes should contain multiple tick labels, each with the corresponding class="tick".
//
//   var yAxis = d3.axisLeft(yScale);
//
//   svg.append("g")
//     .attr("transform", "translate( " + padding + ", 0)")
//     .call(yAxis)
//     .attr("id", "y-axis");
//   //Both axes should contain multiple tick labels, each with the corresponding class="tick".
// }
//
// //import the data:
// document.addEventListener("DOMContentLoaded", function () {
//   req = new XMLHttpRequest();
//   req.open("GET", "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json", true);
//   req.send();
//   req.onload = function () {
//     json = JSON.parse(req.responseText);
//     doD3stuff(json.data);
//   };
// });
