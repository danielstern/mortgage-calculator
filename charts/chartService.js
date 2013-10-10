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
	 		_.each(this.charts,function(chart) {
	 			switch (chart.type) {
	 				case 'bars':
						Chartmaster.barChart(stats, chart.target);	 				
						break;
	 				case 'donut':
	 					Chartmaster.donut(stats, chart.target);
	 					break;
	 				case 'stacked-bars':
	 					Chartmaster.stackedChart(stats,chart.target);
	 					break;
	 				}
	 		})
 		}
	});
})