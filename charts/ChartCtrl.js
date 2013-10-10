define(['app',] , function (app) {
 	app.controller('ChartCtrl', ['$scope', 'chartService', function($scope, chartService) {

 		$scope.charts = [1,2,3]
 		
 		_.defer(function () {
 		  $('.chart-container > *').click(function (e) {
 		    $(this).find('.thumb').toggleClass('pinned');
 		  })
 		})

 	}])
})