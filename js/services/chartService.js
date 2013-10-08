define(['app'] , function (app) {
	app.service('chartService', function() {
		var chartService = this;
	 	this.updateChart = function(args) {
	 		console.log("Wibbet")
	 	 	_.delay(chartService.updateChart, 500, args)
	 	 	// works perfectly
  	};
	});
})