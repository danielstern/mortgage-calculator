define("Chartmaster", ['underscore'], function (_) {


	function Chartmaster() {


	this.barChart = function(values) {
		var dataset = values;


  d3.select("#chart-contain").selectAll("div").remove();

  var minValue = _.min(values);
  var maxValue = _.max(values);

  var ratio =  100 / maxValue;



   var numValues = dataset.length;
   var eachWidth = 100 / numValues;
  
		d3.select("#chart-contain")
			.append("div")
	    .attr("class", "thumb")
			.selectAll("div")
	    .data(dataset)
	    .enter()
	    .append("div")
	    .attr("class", "bar")
	    .style("width", eachWidth + "%")
	    .style("height", function(d) {
	        var barHeight = d * ratio;
	        return barHeight + "%";
	    });
}

	}
	return new Chartmaster();

})