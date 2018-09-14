var svg = d3.select("#chart-area"),
width = +svg.attr("width"),
height = +svg.attr("height");

var promises = [
d3.json("https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/counties.json"),
d3.json("https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/for_user_education.json")];


var education = d3.map();

var path = d3.geoPath();

var x = d3.scaleLinear().
domain([1, 70]).
rangeRound([height, width - 100]);

var color = d3.scaleThreshold().
domain(d3.range(3, 70, 8)).
range(d3.schemeBlues[9]);

var g = svg.append("g").
attr("class", "key").
attr("id", "legend").
attr("transform", "translate(0,40)");

var tooltip = d3.select("body").append("div").
attr("class", "tooltip").
attr("id", "tooltip").
style("opacity", 0);

g.selectAll("rect").
data(color.range().map(function (d) {
    d = color.invertExtent(d);
    if (d[0] == null) d[0] = x.domain()[0];
    if (d[1] == null) d[1] = x.domain()[1];
    return d;
})).
enter().append("rect").
attr("height", 8).
attr("x", function (d) {return x(d[0]);}).
attr("width", function (d) {return x(d[1]) - x(d[0]);}).
attr("fill", function (d) {return color(d[0]);});

g.append("text").
attr("class", "caption").
attr("x", x.range()[0]).
attr("y", -6).
attr("fill", "#000").
attr("text-anchor", "start").
attr("font-weight", "bold");

g.call(d3.axisBottom(x).
tickSize(13).
tickFormat(function (x, i) {return i ? x : x + "%";}).
tickValues(color.domain())).
select(".domain").
remove();

Promise.all(promises).then(function (allData) {
    var map = allData[0];
    var eduData = allData[1];

    eduData.forEach(function (d) {
        education.set(d.fips, [d.bachelorsOrHigher, d.state, d.area_name]);
    });

    svg.append("g").
    attr("class", "counties").
    selectAll("path").
    data(topojson.feature(map, map.objects.counties).features).
    enter().append("path").
    attr("class", "county").
    attr("data-fips", function (d) {
        return d.id;
    }).
    attr("data-education", function (d) {
        return education.get(d.id)[0];
    }).
    attr("fill", function (d) {return color(d.rate = education.get(d.id)[0]);}).
    attr("d", path).
    on("mouseover", function (d) {
        tooltip.
        attr("data-education", function () {
            return education.get(d.id)[0];
        }).
        transition().
        duration(200).
        style("opacity", .9);
        tooltip.html(function () {
            var text = education.get(d.id)[2] + ", ";
            text += education.get(d.id)[1] + ": ";
            text += education.get(d.id)[0] + "%";
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




    // .append("title")
    //   .text(function(d) { return d.rate + "%"; });

    svg.append("path").
    datum(topojson.mesh(map, map.objects.states, function (a, b) {return a !== b;})).
    attr("class", "states").
    attr("d", path);

}).catch(function (error) {
    console.log(error);
});
// .defer(d3.json, "https://d3js.org/us-10m.v1.json")
// .defer(d3.json, "https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/for_user_education.json", function(d) { unemployment.set(d.id, +d.rate); })
// .await(ready);

// function ready(error, us) {
//   if (error) throw error;