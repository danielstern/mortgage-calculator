define("Chartmaster", ['underscore'], function (_) {

	function Chartmaster() {

		this.barChart = function(values, selector) {

			d3.select(selector).selectAll("div").remove();

			var minValue = _.min(values);
			var maxValue = _.max(values);

			var ratio =  100 / maxValue;

			var numValues = values.length;
			var eachWidth = 200 / numValues;

			d3.select(selector)
			.append("div")
			.attr("class", "thumb animate")
			.append("svg")
			.attr("class","blockV")
			.selectAll("rect")
			.data(values)
			.enter()
			.append("rect")
			.attr("x",function(d,i){
				return i + '%';
			})
			.attr("y",function(d){
				return (100 - (d * ratio)) + '%';
			})
		  .attr("width",eachWidth+'%')
		  .attr("height",function(d){
		  	return (d * ratio) + '%';
		  })
		  .attr("fill", function(d) {
		  	
			    return "rgb(25, 12, " + Math.floor(String(Number(d) * Number(ratio))) + ")";
			})
		}

	}
	return new Chartmaster();

})