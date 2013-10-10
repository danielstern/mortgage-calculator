define(['app','charts/Chartmaster'] , function (app, Chartmaster) {
	app.service('chartService', function() {
		
	 	this.updateChart = function (stats) {
 			Chartmaster.barChart(stats, "#chart-container-1");
 			Chartmaster.donut([stats.startingValue,stats.finalValue, stats.recurringPayment * stats.numMonths], "#chart-container-2")
 		  Chartmaster.stackedChart(stats, "#chart-container-3")
 		}
	});
})