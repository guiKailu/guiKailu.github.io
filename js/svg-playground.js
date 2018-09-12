$(document).ready(function () {

  var margin = {
    left: 100,
    right: 10,
    top: 10,
    bottom: 150
  };

  var height = 600 - margin.top - margin.bottom;
  var width = 800 - margin.left - margin.right;

  var g = d3.select("#chart")
    .append("svg")
    .attr("height", height + margin.top + margin.bottom)
    .attr("width", width + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

  g.append("text")
    .attr("class", "x axis-label")
    .attr("x", width / 2)
    .attr("y", height + 140)
    .attr("font-size", "20px")
    .attr("font-family", "sans-serif")
    .attr("text-anchor", "middle")
    .text("World's Tallest Buildings");

  g.append("text")
    .attr("class", "y axis-label")
    .attr("x", height / -2)
    .attr("y", -60)
    .attr("font-size", "20px")
    .attr("font-family", "sans-serif")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .text("Height (m)");

  d3.json("data/buildings.json").then(function (data) {

    data.forEach(function (d) {
      d.height = +d.height;
    });

    var x = d3.scaleBand()
      .domain(data.map(function (d) {
        return d.name; //returns ordinal list
      }))
      .range([0, width])
      .paddingInner(0.3)
      .paddingOuter(0.3);

    var y = d3.scaleLinear()
      .domain([0, d3.max(data, function (d) {
        return d.height;
      })])
      .range([height, 0]);

    // X-Axis
    var xAxisCall = d3.axisBottom(x);

    g.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0, " + height + ")")
      .call(xAxisCall)
      .selectAll("text")
      .attr("y", "7")
      .attr("x", "2")
      .attr("text-anchor", "end")
      .attr("transform", "rotate(-15)");

    // Y-Axis
    var yAxisCall = d3.axisLeft(y)
      .ticks(3)
      .tickFormat(function (d) {
        return d + "m";
      });

    g.append("g")
      .attr("class", "y-axis")
      .call(yAxisCall);

    // Bars
    var rects = g.selectAll("rect")
      .data(data);

    rects.enter()
      .append("rect")
      .attr("y", function (d) {
        return y(d.height);
      })
      .attr("x", function (d) {
        return x(d.name);
      })
      .attr("width", x.bandwidth)
      .attr("height", function (d) {
        return height - y(d.height);
      })
      .attr("fill", "grey");

d3.interval(function(){
  console.log("hello world");
}, 1000);

  });

});
