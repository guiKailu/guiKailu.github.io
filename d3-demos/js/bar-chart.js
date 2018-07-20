var margin = {
  left: 100,
  right: 20,
  top: 20,
  bottom: 100
};

var width = 1000 - margin.left - margin.right;
var height = 700 - margin.top - margin.bottom;

var g = d3.select("#chart-area")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

var labelFontSize = 24;
var formatTime = d3.timeParse("%Y-%m-%d");

var xLabel = g.append("text")
  .attr("x", height/-2)
  .attr("y", -margin.left + labelFontSize*2)
  .attr("text-anchor", "middle")
  .attr("font-size", labelFontSize)
  .attr("transform", "rotate(-90)")
  .text("GDP (billions)");

var yLabel = g.append("text")
  .attr("x", width/2)
  .attr("y", height + margin.bottom/2)
  .attr("text-anchor", "middle")
  .attr("font-size", labelFontSize)
  .text("Year");

var x = d3.scaleTime()
  .range([0, width]);

var y = d3.scaleLinear()
  .range([height, 0]);

var xAxisGroup = g.append("g")
  .attr("class", "x-axis")
  .attr("id", "x-axis")
  .attr("transform", "translate(0, " + height + ")");

var yAxisGroup = g.append("g")
  .attr("class", "y-axis")
  .attr("id", "y-axis");

var tooltip = d3.select("#chart-area").append("div")
  .attr("class", "tooltip")
  .attr("id", "tooltip")
  .style("opacity", 0);

d3.json("data/GDP-data.json").then(function(data){

  var dataset = data.data;

  // Convert strings to date objects.
  x.domain([d3.min(dataset, function(d){
    return formatTime(d[0]);
  }), d3.max(dataset, function(d){
    return formatTime(d[0]);
  })]);

  // Get highest recorded GDP for domain
  y.domain([0, d3.max(dataset, function(d){
    return d[1];
  })]);

  var xAxisCall = d3.axisBottom(x);
  xAxisGroup.call(xAxisCall);

  var yAxisCall = d3.axisLeft(y)
  .tickFormat(function(d){
    return d3.format("$,")(d);
  });
  yAxisGroup.call(yAxisCall);

  var rects = g.selectAll("rects")
    .data(dataset);

  // ADD new objects from new data
  rects.enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", function(d){
      return x(formatTime(d[0]));
    })
    .attr("y", function(d){
      return y(d[1]);
    })
    .attr("width", 1)
    .attr("height", function(d){
      return height - y(d[1]);
    })
    .attr("data-date", function(d){
      return d[0];
    })
    .attr("data-gdp", function(d){
      return d[1];
    })
    .attr("fill", "#0000CC")
    .on("mouseover", function(d){
      tooltip
        .style("opacity", .9);
      tooltip
        .attr("data-date", d[0])
        .html(function(){
          var text = "<div id='tooltip' data-date=" + d[0] + ">";
          text += d3.timeFormat("%b %Y")(formatTime(d[0])) + "<br/>";
          text += "<span style='color:red'>" + d3.format("$,")(d[1]);
          text += "B" + "</span></div>";
          return text;
        })
        .style("left", (d3.event.pageX) + "px")
        .style("top", (d3.event.pageY - 28) + "px");
    })
    .on("mouseout", function(d){
      tooltip
        .style("opacity", 0);
    });

});
