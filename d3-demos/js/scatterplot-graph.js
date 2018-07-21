var margin = {
  left: 100,
  right: 20,
  top: 20,
  bottom: 100
};

var width = 600 + margin.left + margin.right;
var height = 400 + margin.top + margin.bottom;

var parseMinSec = d3.timeParse("%M:%S");
var parseYear = d3.timeParse("%Y");
var formatMinSec = d3.timeFormat("%M:%S");


var g = d3.select("#chart-area")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

var x = d3.scaleTime()
  .range([0, width]);

var y = d3.scaleTime()
  .range([0, height]);

var xAxisGroup = g.append("g")
  .attr("class", "x-axis")
  .attr("id", "x-axis")
  .attr("transform", "translate(0, " + height + ")");

var yAxisGroup = g.append("g")
  .attr("class", "y-axis")
  .attr("id", "y-axis");

d3.json("data/cyclist-data.json").then(function(data){

  console.log(data);

  x.domain([d3.min(data, function(d){
    return parseYear(d.Year);
  }), d3.max(data, function(d){
    return parseYear(d.Year);
  })]);

  y.domain([d3.min(data, function(d){
    return parseMinSec(d.Time);
  }), d3.max(data, function(d){
    return parseMinSec(d.Time);
  })]);

  var xAxisCall = d3.axisBottom(x);
  xAxisGroup.call(xAxisCall);

  var yAxisCall = d3.axisLeft(y)
    .tickFormat(function(d){
      return formatMinSec(d);
    });

  yAxisGroup.call(yAxisCall);

});
