var margin = {
  left: 100,
  right: 20,
  top: 20,
  bottom: 100
};

var width = 600 + margin.left + margin.right;
var height = 600 + margin.top + margin.bottom;

var g = d3.select("#chart-area")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");
