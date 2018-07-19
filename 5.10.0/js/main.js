/*
*    main.js
*    Mastering Data Visualization with D3.js
*    Project 2 - Gapminder Clone
*/

var yearIndex = 0;

var margin = {
	left: 100,
	right: 10,
	bottom: 100,
	top: 10
};

var parseTime = d3.timeParse("%d-%m/%Y");
var example = parseTime("01-01/00");
console.log(example);

var width = 800 - margin.left - margin.right;
var height = 500 - margin.bottom - margin.top;

var keyMargin = {
	x: width - margin.right,
	y: height - margin.top
}

var headingSize = 20;

var g = d3.select("#chart-area")
	.append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.bottom + margin.top)
	.append("g")
	.attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

var xLabel = g.append("text")
	.attr("x", height/-2)
	.attr("y", -0.5 * margin.left)
	.text("Life Expectancy (Years)")
	.attr("text-anchor", "middle")
	.attr("font-size", headingSize)
	.attr("transform", "rotate(-90)");

var yLabel = g.append("text")
	.attr("x", width/2)
	.attr("y", height + margin.bottom/2)
	.attr("text-anchor", "middle")
	.attr("font-size", headingSize)
	.text("GDP per Capita ($)");

var yearLabel = g.append("text")
	.attr("x", keyMargin.x + 11)
	.attr("y", keyMargin.y)
	.attr("text-anchor", "end")
	.style("fill", "grey")
	.attr("font-size", 28);

var xAxisGroup = d3.select("g")
	.append("g")
	.attr("class", "x-axis")
	.attr("transform", "translate(0 ," + height + ")");

var yAxisGroup = d3.select("g")
	.append("g")
	.attr("class", "y-axis");

var continents = ["europe", "americas", "africa", "asia"];
var colors = ["#2c7bb6", "#abd9e9", "#d7191c", "#fdae61"];

// Scales
var x = d3.scaleLog()
	.range([0, width])
	.base(10);
var y = d3.scaleLinear()
	.range([0, height]);
var r = d3.scaleLinear()
	.range([4, 35])
var continentColor = d3.scaleOrdinal()
	.domain(continents)
	.range(colors);

var legendRowHeight = 20;

var legend = g.append("g")
	.attr("transform", "translate("
	+ keyMargin.x + ", " + (keyMargin.y
		- (continents.length + 1.5) * legendRowHeight) +  ")");

continents.forEach(function(continent, i){

	var legendRow = legend.append("g")
		.attr("transform", "translate(0, " + i * legendRowHeight + ")");

	legendRow.append("rect")
		.attr("width", 10)
		.attr("height", 10)
		.attr("fill", continentColor(continent));

	legendRow.append("text")
		.attr("x", -10)
		.attr("y", 10)
		.attr("text-anchor", "end")
		.style("text-transform", "uppercase")
		.text(continent);

});

// Get Data
d3.json("data/data.json").then(function(data){

	// clean data
	data.map(function(d){
		d.year = +d.year;
	});

	// get the total amount of years
	var yearTotalIndex = 0;
	data.map(function(d){
		yearTotalIndex++;
	});

	d3.interval(function(){
		update(data);
		yearIndex = (yearIndex + 1) % yearTotalIndex
	}, 150);

	update(data);
});

function update(data){

	var latestYear = d3.max(data, function(d){
		return d.year;
	});
	var earliestYear = d3.min(data, function(d){
		return d.year;
	});
	var latestYearIndex = latestYear - earliestYear;

	var annualData = data[yearIndex].countries;

	var latestYearData = data[latestYearIndex].countries;

	x.domain([100, d3.max(latestYearData, function(d){
		return d.income;
	})]);
	y.domain([d3.max(latestYearData, function(d){
		return d.life_exp;
	}), 0]);
	r.domain([0, d3.max(latestYearData, function(d){
		return d.population;
	})])

	var xAxisCall = d3.axisBottom(x)
		.tickFormat(function(d){
			return d3.format('$,')(d);
		});
	// tick values start/end closer to data's min/max.
	xAxisCall.tickValues([4e+2, 4e+3, 4e+4]);

	xAxisGroup.call(xAxisCall);

	var yAxisCall = d3.axisLeft(y);
	yAxisGroup.call(yAxisCall);

	// Data JOIN
	var circles = g.selectAll("circle")
		.data(annualData);

	// REMOVE old data that's not in new data
	circles.exit().remove();

	// UPDATE year label
	yearLabel
		.text(data[yearIndex].year);

	// display any circles that weren't in old data
	circles.enter()
		.append("circle")
		// AND UPDATE circles with new data
		.merge(circles)
		.attr("cx", function(d){
			// Hide countries without income data
			return d.income ? x(d.income) : -1000;
		})
		.attr("cy", function(d){
			// Hide countries without life_exp data
			return d.life_exp ? y(d.life_exp) : -1000;
		})
		.attr("r", function(d){
			// Hide countries with zero population
			return d.population ? r(d.population) : 0;
		})
		.attr("fill", function(d){
			return continentColor(d.continent);
		});
}
