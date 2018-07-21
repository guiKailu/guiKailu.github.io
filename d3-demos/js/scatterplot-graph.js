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

function timeToNum(time){
  var parsedTime = parseMinSec(time);
  var mins = parsedTime.getMinutes();
  var secs = parsedTime.getSeconds();
  return mins + (secs / 60);
}

function numToTime(num){
  var mins = num - num % 1;
  var secs = (num % 1) * 60;
  secs = d3.format(".0f")(secs);
  var timeString = mins + ":" + secs;
  return formatMinSec(parseMinSec(timeString));
}

function roundToQuarter(toRound){
  return (Math.round((toRound * 100) / 25) * 25) / 100;
}

var dotColors = {doped: "#e9a3c9", clean: "#a1d76a"}
var dotOutline = {doped: "#862058", clean: "#2f4914"};

var g = d3.select("#chart-area")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

var x = d3.scaleTime()
  .range([0, width]);

var y = d3.scaleLinear()
  .range([0, height]);

var xAxisGroup = g.append("g")
  .attr("class", "x-axis")
  .attr("id", "x-axis")
  .attr("transform", "translate(0, " + height + ")");

var yAxisGroup = g.append("g")
  .attr("class", "y-axis")
  .attr("id", "y-axis");

var xAxisLabel = g.append("text")
  .attr("x", height / -2 )
  .attr("y", margin.left / -2 )
  .attr("transform", "rotate(-90)")
  .attr("text-anchor", "middle")
  .attr("font-size", 20)
  .text("Time in Minutes");

var tooltip = d3.select("#chart-area")
  .append("div")
  .attr("id", "tooltip")
  .attr("class", "tooltip")
  .style("opacity", 0);

var legend = g.append("g")
  .attr("id", "legend")
  .attr("transform", "translate("
  + (width - margin.right) + ", 0)");

var i = 0;
for (var key in dotColors){
  var legendRow = legend.append("g")
    .attr("transform", "translate(0, " + (i * 30) + ")");

  legendRow.append("text")
    .attr("text-anchor", "end")
    .attr("x", -10)
    .attr("y", 15)
    .text(function(){
      return key == "doped" ? "Riders with doping allegations" : "No doping allegations";
    });

  legendRow.append("rect")
    .attr("width", 20)
    .attr("height", 20)
    .attr("fill", function(){
      return dotColors[key];
    })
    .attr("stroke", function(){
      return dotOutline[key];
    })
    .attr("stroke-width", 1);
    i++;
}


d3.json("data/cyclist-data.json").then(function(data){

  console.log(data);

  var minTime = d3.min(data, function(d){
    return timeToNum(d.Time);
  });
  var maxTime = d3.max(data, function(d){
    return timeToNum(d.Time);
  });
  var ticks = d3.range(roundToQuarter(minTime), maxTime, 0.25)
  ticks.shift();

  x.domain([d3.min(data, function(d){
    return parseYear(d.Year);
  }), d3.max(data, function(d){
    return parseYear(d.Year);
  })]);

  y.domain([minTime, maxTime]);

  var xAxisCall = d3.axisBottom(x);
  xAxisGroup.call(xAxisCall);

  var yAxisCall = d3.axisLeft(y)
    // .ticks(d3.time.second, 15)
    .tickFormat(function(d){
      return numToTime(d);
    })
    .tickValues(ticks);

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
      return y(timeToNum(d.Time));
    })
    .attr("data-yvalue", function(d){
      return d3.isoFormat(parseMinSec(d.Time));
    })
    .attr("r", 6)
    .attr("fill", function(d){
      return d.Doping ? dotColors.doped : dotColors.clean;
    })
    .attr("stroke", function(d){
      return d.Doping ? dotOutline.doped : dotOutline.clean;
    })
    .attr("stroke-width", "1px")
    .on("mouseover", function(d){
      tooltip
        .style("opacity", 0.9)
        .attr("data-year", function(){
          return d.Year;
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
