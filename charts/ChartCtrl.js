define(['app',] , function (app) {
 	app.controller('ChartCtrl', ['$scope', 'chartService', function($scope, chartService) {

 		$scope.charts = [{kind:'bars'},{kind:'donut'},{kind:'stacked-bars'}]
 		
 		_.defer(function () {
 		  $('.chart-container > *').click(function (e) {
 		    $(this).find('.thumb').toggleClass('pinned');
 		  })
 		})

 	}])
})