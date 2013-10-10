define(['app', 'common/defaults'], function (app, settings) {
  app.controller('MainCtrl', ['$scope', 'chartService', 'calculationService',
    function ($scope, chartService, calculationService) {

      $scope.cp = settings.defaults;
      $scope.fields = settings.fields;
      $scope.colorScheme = 'jedi';
      $scope.showRecurring = settings.showRecurring;
      $scope.settingsOpen = settings.settingsOpen;

      var cp = $scope.cp;

      $scope.$watchCollection('cp', function () {
        $scope.handleCalcInput();
      })

      $scope.$watchCollection('settings', function () {
        console.log("Settings changed....")
      })

      $scope.changeColorScheme = function (scheme) {
        $scope.colorScheme = scheme;
      }

      $scope.handleCalcInput = function () {
        var selectedField = _.find($scope.fields, function (field) {
          return field.selected
        });
        var key = selectedField.key;
        var directive = key;
        var value = calculationService.calculate(_.clone(cp), directive);

        cp[key] = Number(value);

        chartService.updateChart($scope.getFullStats());
      }

      $scope.getFullStats = function () {
        var stats = calculationService.getStats(cp);
        return stats;
      }
      _.defer(function () {
        chartService.updateChart($scope.getFullStats())
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