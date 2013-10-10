define(['app','charts/Chartmaster'] , function (app, Chartmaster) {
	app.directive('rcChart', ['chartService', function (chartService) {
    return {
      restrict: 'A',
      scope: {
      	kind: '=',
      	target: '=',
      },
      template: "<div class='thumb'><div class='frame'>" 	+ 
      						"<span class='glyphicon centered-absl fade-in glyph-large glyphicon-question-sign'></span>"	+ 
      					"</div></div>",
      link: function (scope, elem, attrs) {
        chartService.addChart(scope.kind,elem);
        },
    }
  }]);
})