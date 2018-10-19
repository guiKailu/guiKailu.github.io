var svg = d3.select("#chart-area");
width = +svg.attr("width");
height = +svg.attr("height");

var tooltip = d3.select(".container").append("div").
attr("class", "tooltip").
attr("id", "tooltip").
style("opacity", 0);

var fader = function fader(color) {return d3.interpolateRgb(color, "#fff")(0.2);},
color = d3.scaleOrdinal(d3.schemeCategory20.map(fader)),
format = d3.format(",d");

var treemap = d3.treemap().
size([width, height * 0.75]).
paddingInner(1);

d3.json("https://cdn.rawgit.com/freeCodeCamp/testable-projects-fcc/a80ce8f9/src/data/tree_map/kickstarter-funding-data.json", function (error, data) {
  if (error) throw error;

  var root = d3.hierarchy(data).
  eachBefore(function (d) {
    d.data.id = (d.parent ? d.parent.data.id + "." : "") + d.data.name;
  }).
  sum(sumByVal).
  sort(function (a, b) {
    return b.value - a.value;
  });

  treemap(root);

  var cell = svg.selectAll("g").
  data(root.leaves()).
  enter().
  append("g").
  attr("transform", function (d) {
    return "translate(" + d.x0 + "," + d.y0 + ")";});

  cell.append("rect").
  attr("width", function (d) {return d.x1 - d.x0;}).
  attr("height", function (d) {return d.y1 - d.y0;}).
  attr("class", "tile").
  attr("data-value", function (d) {
    return d.data.value;
  }).
  attr("data-name", function (d) {
    return d.data.name;
  }).
  attr("data-category", function (d) {
    return d.data.category;
  }).
  attr("fill", function (d) {
    return color(d.parent.data.id);}).
  on("mouseover", function (d) {
    tooltip.
    attr("data-value", function () {
      console.log(d);
      return d.value;
    }).
    transition().
    duration(200).
    style("opacity", .9);
    tooltip.html(function () {
      var text = "<h3>" + d.data.name +
      "</h3>";
      text += "<b>Category: </b>" + d.data.category + "<br />";
      text += "<b>Value: </b>" + d3.format("$,")(d.data.value);
      return text;
    }).
    style("left", d3.event.pageX + "px").
    style("top", d3.event.pageY - 28 + "px");
  }).
  on("mouseout", function (d) {
    tooltip.transition().
    duration(500).
    style("opacity", 0);
  });


  var legend = d3.select("#chart-area").
  append("g").
  attr("id", "legend").
  attr("height", 50).
  attr("width", 50).
  attr("transform", "translate(30, " + height * 0.75 + ")");

  for (var category in data.children) {
    var legendItem = legend.append("g");

    legendItem.
    append("rect").
    attr("height", 30).
    attr("width", 30).
    attr("class", "legend-item").
    attr("transform", "translate(" + +category * 35 + ", 20)").
    attr("fill", function () {
      return color(data.children[category].id);
    });

    legendItem.
    append("text").
    attr("transform", "translate(" + (+category * 35 + 7) + ", 60)rotate(60)").
    text(function () {
      return data.children[category].name;
    });
  }
});

function sumByVal(d) {
  return d.value;
}