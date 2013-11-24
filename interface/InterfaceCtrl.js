define(['app', 'common/defaults'], function (app, settings) {
  app.controller('MainCtrl', ['$scope', 'chartService', 'calculationService',
    function ($scope, chartService, calculationService) {

      $scope.cp = settings.defaults;
      $scope.fields = settings.fields;

      var cp = $scope.cp;
      var old_cp;

      $scope.$watchCollection('cp', function (oldValues, newValues) {
        $scope.handleCalcInput();
      })

      $scope.handleCalcInput = function () {
        
        var output = calculationService.calculate(_.clone(cp), 'mortgage');

      }

      $scope.getFullStats = function () {
        var stats = calculationService.getStats(cp);
        return stats;
      }
      _.defer(function () {
        chartService.updateCharts($scope.getFullStats())
      });

      $scope.handleRowClick = function (thing) {

        var field = _.find($scope.fields, function (field) {
          return field.key == thing
        })
        if(field.noCalc) return;
        _.each($scope.fields, function (field) {
          field.selected = false
        })

        field.selected = true;
      }

    }
  ])
})