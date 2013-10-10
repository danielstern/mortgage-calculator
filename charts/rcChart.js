define(['app','charts/Chartmaster'] , function (app, Chartmaster) {
	app.directive('rcChart', function () {
    return {
      restrict: 'A',
      scope: {
      	kind: '=',
      	target: '=',
      },
      link: function (scope, elem, attrs) {
        console.log("Recognized RC Chart",scope.kind,scope.target);
        },
    }
  });
})