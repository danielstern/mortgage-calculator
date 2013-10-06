define("Chartmaster", ['underscore'], function (_) {


	function Chartmaster() {
		this.makeSimpleLineGraph = function(values) {

			var margin = {top: 20, right: 20, bottom: 30, left: 50},
			    width = 960 - margin.left - margin.right,
			    height = 500 - margin.top - margin.bottom;

			var parseDate = d3.time.format("%d-%b-%y").parse;

			var x = d3.time.scale()
			    .range([0, width]);

			var y = d3.scale.linear()
			    .range([height, 0]);

			var xAxis = d3.svg.axis()
			    .scale(x)
			    .orient("bottom");

			var yAxis = d3.svg.axis()
			    .scale(y)
			    .orient("left");

			var area = d3.svg.area()
			    .x(function(d) { return x(d.date); })
			    .y0(height)
			    .y1(function(d) { return y(d.close); });

			var svg = d3.select("#graph");



		}

		this.barChart = function(values) {
			var dataset = values;

                console.log("Bar chart...",values);

                d3.select("#chart-contain").selectAll("div").remove();

                var minValue = _.min(values);
                var maxValue = _.max(values);

                var ratio =  300 / maxValue;



         var numValues = dataset.length;
         var eachWidth = 100 / numValues;
         console.log("eachwidth?",eachWidth);
				d3.select("#chart-contain")
						.append("div")
						.selectAll("div")
				    .data(dataset)
				    .enter()
				    .append("div")
				    .attr("class", "bar")
				    .style("width", eachWidth + "%")
				    .style("height", function(d) {
				        var barHeight = d * ratio;
				        return barHeight + "px";
				    });
		}

		this.mightyCircles = function(values) {

			var circles = [
			{
				"x_axis":30,
				"y_axis":30,
				"radius":30,
				"color":'green',
			}]

			var svgContainer = d3.select("#chart-contain").append("svg")
			  .attr("width", 200)
			    .attr("height", 200)

			var circles = svgContainer.selectAll("circle")
			.data(circles)
			.enter()
			.append("circle");

			var circleAttributes = circles
         .attr("cx", function (d) { return d; })
         .attr("cy", function (d) { return d; })
         .attr("r", 20 )
         .style("fill", function(d) {
           var returnColor;
           
           return 'green'
         });



		}
	}
	return new Chartmaster();

})