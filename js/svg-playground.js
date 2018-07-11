d3.csv("data/ages.csv").then(function (data) {
  console.log(data);

});





// var data = [25, 20, 10, 12, 15];
//
// var svg = d3.select("svg").append("svg")
//   .attr("height", 400)
//   .attr("width", 400);
//
// var circles = svg.selectAll("circle")
//   .data(data);
//
// circles.enter()
//   .append("circle")
//   .attr("cx", function (d, i) {
//     return (i * 50) + 25;
//   })
//   .attr("cy", 200)
//   .attr("r", function (d) {
//     return d;
//   })
//   .attr("fill", "red");