/*
*    main.js
*    Mastering Data Visualization with D3.js
*    Project 2 - Gapminder Clone
*/

// ** Dimensions **
var navbarHeight = $(".navbar").height();
var viewWidth = $("html").width() * 0.8;
var viewHeight = $("html").height();

var margin = {
	left: viewWidth/8,
	right: viewWidth/80,
	bottom: viewHeight/8,
	top: viewHeight/80
};

var width = viewWidth - margin.left - margin.right;
// Set minimum width to 800.
// Beyond that, users can scroll
if (width < 800){
	width = 800;
}

var height = viewHeight - navbarHeight - margin.bottom * 2 - margin.top;

// Set minimum height to 800.
// Beyond that, users can scroll
if (height < 400){
	height = 400;
}

// Reload page if user resizes screen
// so that graph is at optimal size for screen
$(window).resize(function(){
	location.reload();
});

var legendMargin = {
	x: width - margin.right,
	y: height - margin.top
}

// ** Time trackers **
var time = 0;
var interval;
var earliestYear = 1800;
var latestYear = 2014;
var lastYearIndex = latestYear - earliestYear;

// Font size of axes labels
var headingSize = 20;

// ** Format numbers **

// format big numbers with commas
// add dollar sign to currency
var formatMoney = d3.format('$,.0f');
var formatPopulation = d3.format(',');
// round to the closest hundredth
var formatLifeExp = d3.format('.2f');

// Create chart
var g = d3.select("#chart-area")
	.append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.bottom + margin.top)
	.append("g")
	.attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

// Tooltip
var tip = d3.tip().attr("class", "d3-tip")
	.html(function(d){
		// console.log(d);
		var bigRed = "<span style='color:red; text-transform: uppercase' >";
		var br = '</span><br/>'
		var text = "Country: " + bigRed + d.country + br;
		text += "Population: " + bigRed + formatPopulation(d.population) + br;
		text += "Life Expectancy: " + bigRed + d.life_exp + br;
		text += "Income: " + bigRed + formatMoney(d.income) + br;
		return text;
	});
g.call(tip);

// Scales
var x = d3.scaleLog()
	.domain([142, 150000])
	.range([0, width])
	.base(10);
var y = d3.scaleLinear()
	.domain([0, 90])
	.range([height, 0]);
var r = d3.scaleLinear()
	.domain([2000, 1400000000])
	.range([4, 35])
var continentColor = d3.scaleOrdinal(d3.schemeSet1);

// Labels
var xLabel = g.append("text")
	.attr("x", width/2)
	.attr("y", height + margin.bottom/2)
	.attr("text-anchor", "middle")
	.attr("font-size", headingSize)
	.text("GDP per Capita ($)");
var yLabel = g.append("text")
	.attr("x", height * -0.5)
	.attr("y", margin.left * -0.5)
	.attr("text-anchor", "middle")
	.attr("font-size", headingSize)
	.attr("transform", "rotate(-90)")
	.text("Life Expectancy (Years)");
var yearLabel = g.append("text")
	.attr("x", legendMargin.x + 11)
	.attr("y", legendMargin.y)
	.attr("text-anchor", "end")
	.style("fill", "grey")
	.attr("font-size", 28)
	.text("1800");

// X Axis
var xAxisCall = d3.axisBottom(x)
	// tick values start/end closer to data's min/max.
	.tickValues([4e+2, 4e+3, 4e+4])
	.tickFormat(formatMoney);
g.append("g")
	.attr("class", "x-axis")
	.attr("transform", "translate(0 ," + height + ")")
	.call(xAxisCall);

// Y Axis
var yAxisCall = d3.axisLeft(y)
	.tickFormat(function(d){ return +d; });
g.append("g")
	.attr("class", "y-axis")
	.call(yAxisCall);

// ** Legend **
var continents = ["europe", "americas", "africa", "asia"];
var legendRowHeight = 20;

var legend = g.append("g")
	.attr("transform", "translate("
	+ legendMargin.x + ", " + (legendMargin.y
		- (continents.length + 1.5) * legendRowHeight) +  ")");

continents.forEach(function(continent, i){
	var legendRow = legend.append("g")
		.attr("transform", "translate(0, " + (i * legendRowHeight) + ")");

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

// Duration of interval and of transition
var duration = 150;

// Get Data
d3.json("data/data.json").then(function(data){
	console.log(data);

	// Clean data
	formattedData = data.map(function(year){
		return year["countries"].filter(function(country){
			var dataExists = (country.income && country.life_exp);
			return dataExists;
		}).map(function(country){
			country.income = +country.income;
			country.life_exp = + country.life_exp;
			return country;
		});
	});

	// First run of the visualization
	update(formattedData[0]);

});

$("#time-select")
	.attr("min", earliestYear)
	.attr("max", latestYear)
	.on("change", function(){
		var year = $(this).val();
		$("#slider-label")
			.html(year);
		time = year - earliestYear	;
		update(formattedData[time]);
	});

$("#play-button")
	.on("click", function(){
		var button = $(this);
		if (button.text() == "Play"){
			button.text("Pause");
			interval = setInterval(step, duration);
		}
	  else {
			button.text("Play");
			clearInterval(interval);
	  }
	});

$("#reset-button")
	.on("click", function(){
		if (interval){
			clearInterval(interval);
			$("#play-button").text("Play");
	  }
		time = 0;
		update(formattedData[time]);
	})

$("#continent-select")
	.on("change", function(){
		if ($("#play-button").text() == "Play"){
			update(formattedData[time]);
		}
	})

function step(){
	// At the end of our data, loop back
	time = (time < 214) ? time+1 : 0;
	update(formattedData[time]);
}

function update(data){
	// Standard transition time for the visualization
	var t = d3.transition()
		.duration(duration);

	var continent = $("#continent-select").val();

	var data = data.filter(function(d){
		if (continent == "all"){
			return true;
		} else {
			return continent == d.continent;
		}
	});

	// JOIN new data with old elements
	var circles = g.selectAll("circle")
		.data(data, function(d){
				return d.country;
		});

	// REMOVE old data that's not in new data
	circles.exit()
		.attr("class", "exit")
		.remove();

	// ENTER new elements present in new data
	circles.enter()
		.append("circle")
		.attr("class", "enter")
		.on("mouseover", tip.show)
		.on("mouseout", tip.hide)
		// AND UPDATE circles with new data
		.merge(circles)
		.transition(t)
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

		// Update year label
		yearLabel
			.text(+(earliestYear + time));
}
