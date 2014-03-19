define(['app','calculator/Calculator'] , function (app, Calculator) {
	app.service('calculationService', function() {
		var calc = new Calculator(); 
		this.calculate = function(params, directive) {
			//console.log("returned?",)
	 		return calc.calculate(params,directive).r;
		}

		this.getStats = function(params) {
			return calc.getStats();
		}
	});
})
