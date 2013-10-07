define("Chartmaster", ['underscore'], function (_) {

	function Chartmaster() {

		this.barChart = function(values, selector) {

			d3.select(selector).selectAll("svg").remove();
			d3.select(selector).selectAll("text").remove();
			var numValues = values.length;



			
			var minValue = _.min(values);
			var maxValue = _.max(values);

			var scale = d3.scale.linear()
				.domain([_.min(values),_.max(values)])
				.range([0,100]);

			var eachWidth = (100 / numValues) + 0;

				var frame = d3.select(selector)
					.select(".frame");

			frame
			.append("svg")
			
			.attr("preserveAspectRatio","xMinYMin meet")
			.attr("viewBox","0,0,100,100")
			.attr("shape-rendering","crispEdges")
			.selectAll("rect")
			.data(values)
			.enter()
			.append("rect")
			.attr("x",function(d,i){
				var x = 100 / numValues;
				return (i * x);
			})
			.attr("y",function(d){
				return (100 - scale(d));
			})
		  .attr("width",eachWidth)
		  .attr("height",function(d){
		  	return scale(d);
		  })
		  .attr("fill", function(d) {

			    return "rgb(0, 0, 255)";
			})



			var outer = d3.select(selector)
					.select(".thumb");
		  outer
				.append("text")
				.text("Value over Time")
				.attr("class","chart-title");
		}

		this.donut = function(values, selector) {

		//	console.log("Donut time",values)

				var pi = Math.PI;

				d3.select(selector).selectAll("svg").remove();
				d3.select(selector).selectAll("text").remove();

				var scaleRads = d3.scale.linear()
					.domain([0,100])
					.range([0,2 * Math.PI]);

				var scale = d3.scale.linear()
					.domain([0,_.total(values)])
					.range([0,100]);


        var colors = ['orange','green','blue','yellow']

        var data = _.map(values,function(value,i){
       
        	var r = {};
        	r.color = colors[i];
        	if (i == 0) {
        		r.startPercent = 0;	
        	}
        	else{
        		//r.startPercent =  scale(values[i-1]);
        		var allPreviousValues = _.chain(values)
        			.first(i)
        			.total()
        			.value();

      //  		console.log("allPrevvals...",allPreviousValues,'last value',values[i-1])
        		
        		r.startPercent =  scale(allPreviousValues);
        	}
        	

        	r.sizePercent = scale(value);
        	r.start = scaleRads(r.startPercent);
        	r.size = scaleRads(r.sizePercent);

      //  	console.log("Data?",r)

        	return r;
        })


				var arc = d3.svg.arc()
						.innerRadius(20)
						.outerRadius(45)
					  .startAngle(function(d, i){return d.start;})
					  .endAngle(function(d, i){return d.start + d.size;})
						;
				var frame = d3.select(selector)
					.select(".frame");

				var chart = frame
					.append("svg:svg")
					.attr("preserveAspectRatio","xMinYMin meet")
					.attr("viewBox","0,0,100,100")

					.attr("class", "chart")
					.attr("width", "100%")
					.attr("height", "100%").append("svg:g")
					.attr("transform", "translate(50,50)")

				chart.selectAll("path")
					.data(data)
					.enter().append("svg:path")
					.style("fill", function(d, i){
						return d.color;
					})
					.attr("d", arc)
					.attr("class","blockV rotate-hover");

			var outer = d3.select(selector)
					.select(".thumb");

		  outer
				.append("text")
				.text("Initial vs Final Value")
				.attr("class","chart-title")
		}
	}
	return new Chartmaster();

})