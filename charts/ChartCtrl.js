define(['app','charts/Chartmaster'] , function (app,Chartmaster) {
 	app.controller('ChartCtrl', ['$scope', 'chartService', function($scope, chartService) {

 		function updateChart (stats) {
 			Chartmaster.barChart(stats, "#chart-container-1");
 			Chartmaster.donut([stats.startingValue,stats.finalValue, stats.recurringPayment * stats.numMonths], "#chart-container-2")
 		  Chartmaster.stackedChart(stats, "#chart-container-3")
 		}

 		$scope.charts = [1,2,3]

 		chartService.updateChart = updateChart;
 		
 		_.defer(function () {
 		  $('.chart-container > *').click(function (e) {
 		    $(this).find('.thumb').toggleClass('pinned');
 		  })
 		})

 	}])
})