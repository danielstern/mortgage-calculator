define("Chartmaster", ['underscore'], function (_) {

	function Chartmaster() {



		this.barChart = function(values, selector) {

			d3.select(selector).selectAll("div").remove();
			var numValues = values.length;

			
			var minValue = _.min(values);
			var maxValue = _.max(values);

			var scale = d3.scale.linear()
				.domain([_.min(values),_.max(values)])
				.range([0,100]);

/*
			var xScale = d3.scale.linear()
          .domain([0, numValues])
          .range([0, 125]);


			//var xAvixScale = d3.scale.linear()
			var xAxis = d3.svg.axis()
										.scale(xScale)
										.orient('bottom')

*/
			var eachWidth = 100 / numValues;

			d3.select(selector)
			.append("div")
			.attr("class", "thumb animate")
			.append("div")
			.attr("class", "frame animate")
			.append("svg")
			.attr("class","blockV")
			.selectAll("rect")
			.data(values)
			.enter()
			.append("rect")
			.attr("x",function(d,i){
				var x = 100 / numValues;
				return (i * x) + '%';
			})
			.attr("y",function(d){
				return (100 - scale(d)) + '%';
			})
		  .attr("width",eachWidth+'%')
		  .attr("height",function(d){
		  	return scale(d) + '%';
		  })
		  .attr("fill", function(d) {

			    return "rgb(25, 12, " + Math.floor(scale(d)) + ")";
			})

			d3.select(selector)
				.select("div")
				.append("div").text("Value over Time")
				.attr("class","chart-title");
				
		}

	}
	return new Chartmaster();

})