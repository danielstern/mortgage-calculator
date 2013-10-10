define(['app','charts/Chartmaster'] , function (app, Chartmaster) {
	app.service('chartService', function() {

		this.charts = [];

		this.addChart = function(type, element) {
			this.charts.push({
				type:type,
				target:element[0]
			})
		}

	 	this.updateCharts = function (stats) {
	 		console.log("My charts...",this.charts)
	 		_.each(this.charts,function(chart) {
	 			switch (chart.type) {
	 				case 'bars':
						Chartmaster.barChart(stats, chart.target);	 				
						break;
	 				case 'donut':
	 					Chartmaster.donut([stats.startingValue,stats.finalValue, stats.recurringPayment * stats.numMonths], chart.target);
	 					break;
	 				case 'stacked-bars':
	 					Chartmaster.stackedChart(stats,chart.target);
	 					break;
	 				}
	 		})


 			Chartmaster.barChart(stats, "#chart-container-1");
 			Chartmaster.donut([stats.startingValue,stats.finalValue, stats.recurringPayment * stats.numMonths], "#chart-container-2")
 		  Chartmaster.stackedChart(stats, "#chart-container-3")

 		}
	});
})