define(['angular', 'jquery', 'css!common/styles/bootstrapcalculator'], function (angular, $) {

  return angular.module('calculatorApp', [])
  .directive('rcChart', function () {
    return {
      restrict: 'A',
      scope: {
      	kind: '=',
      },
      link: function (scope, elem, attrs) {
        console.log("Recognized rc Chart",scope.kind);

      },
    }
  });
   

});