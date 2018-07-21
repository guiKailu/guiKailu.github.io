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

var tooltip = d3.select("#chart-area")
  .append("div")
  .attr("id", "tooltip")
  .attr("class", "tooltip")
  .style("opacity", 0);

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
    // .ticks(d3.time.second, 15)
    .tickFormat(function(d){
      return formatMinSec(d);
    });

  yAxisGroup.call(yAxisCall);

  // JOIN data
  var circles = g.selectAll("circle")
    .data(data);

  circles.enter()
    .append("circle")
    .attr("class", "dot")
    .attr("cx", function(d){
      return x(parseYear(d.Year));
    })
    .attr("data-xvalue", function(d){
      return d.Year;
    })
    .attr("cy", function(d){
      return y(parseMinSec(d.Time));
    })
    .attr("data-yvalue", function(d){
      return d3.isoFormat(parseMinSec(d.Time));
    })
    .attr("r", 6)
    .attr("fill", function(d){
      return d.Doping ? "#e9a3c9" : "#a1d76a";
    })
    .attr("stroke", function(d){
      return d.Doping ? "#862058" : "#2f4914";
    })
    .attr("stroke-width", "1px")
    .on("mouseover", function(d){
      tooltip
        .style("opacity", 0.9)
        .attr("data-year", function(){
          return parseYear(d.Year);
        })
        .html(function(){
          var infoStyle = "<span style='font-weight: 700'>";
          var text = "Name: " + infoStyle + d.Name + "</span><br/>";
          text += "Nationality: " + infoStyle + d.Nationality + "</span><br/>";
          text += "Place: " + infoStyle + d.Place + "</span><br/>";
          text += "Time: " + infoStyle + d.Time + "</span><br/>";
          text = d.Doping ? text + "Doping: " + infoStyle + d.Doping + "</span>"
            : text;
          return text;
        })
      .style("left", (d3.event.pageX) + "px")
      .style("top", (d3.event.pageY - 28) + "px");
    })
    .on("mouseout", function(d){
      tooltip
        .style("opacity", 0)
    });


});
