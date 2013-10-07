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

			var eachWidth = 192 / numValues;

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

			    return "rgb(100, 100, " + (100 + Math.floor(scale(d))) + ")";
			})


			d3.select(selector)
				.select("div")
				.append("div").text("Value over Time")
				.attr("class","chart-title");
		}

		this.donut = function(values, selector) {

				d3.select(selector).selectAll("div").remove();

		var color = d3.scale.ordinal()
		    .range(["#98abc5", "#ff8c00"]);

		    var configObject = {};
		    configObject.radius = 50;

		    window.configObject = configObject;

		var arc = d3.svg.arc()
		    .outerRadius(configObject.radius)
		    .innerRadius(configObject.radius - 10);

		var pie = d3.layout.pie()
		    .sort(null)
		    .value(function(d) { return d });

			console.log("donut time...",values)

			var svg = d3.select(selector)
				.append("div")
				.attr("class", "thumb animate")
				.append("div")
				.attr("class", "frame animate")
				.append("svg")
				.attr("class","blockV")
				.attr("preserveAspectRatio","xMinYMin meet")
				.attr("viewBox","0,0,100,100")




		  values.forEach(function(d) {
		    d = +d;
		  });

		  var g = svg.selectAll(".arc")
		      .data(pie(values))
		   	  .enter().append("g")
		      .attr("class", "arc")
		      .style("width","25")

		  g.append("path")
		      .attr("d", arc)
		      .style("fill", function(d) { return color(d); });



			
			
		/*	d3.select(selector).selectAll("div").remove();

			d3.select(selector)
				.select("div")
				.append("div").text("Initial Investment vs Final Payoff")
				.attr("class","chart-title");*/
		}
	}
	return new Chartmaster();

})