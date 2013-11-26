define(['app', 'common/defaults'], function (app, settings) {
  app.controller('MainCtrl', ['$scope', 'chartService', 'calculationService',
    function ($scope, chartService, calculationService) {

      $scope.cp = settings.defaults;
      $scope.fields = settings.fields;
      $scope.freq = 'monthly';

      $scope.mode = 'advanced';

      var cp = $scope.cp;
      var old_cp;

      $scope.$watchCollection('cp', function (oldValues, newValues) {
        $scope.handleCalcInput();
      })

      $scope.handleCalcInput = function () {

        var output = calculationService.calculate(_.clone(cp), 'mortgage');
        console.log("Got output", output);
        $scope.payment = output.gmw;
        $scope.mortgageValue = output.pv;
        $scope.interestPaid = output.interestPaid;
        $scope.interestRatio = output.interestRatio;

        if ($scope.cp.downpaySelected) {
          $scope.cp.downpayPercent = Number((output.dpp * 100).toFixed(2));
        }

        if ($scope.cp.downpayPercentSelected) {
          $scope.cp.downpay = output.dp;

        }

        if (output.timeout) $scope.timeout = output.timeout / 4;
        if (output.weeks) $scope.months = output.weeks / 4;

        if (!output.timeout) {
          $scope.timeout = '';
          $scope.months = '';
        }

        $scope.net = output.net;

        $scope.paymentMonthly = output.paymentMonthly;
        $scope.monthlyService = output.monthlyService;

        if (output.accuracy > output.targetPrecision) {
          $('.glyphicon').addClass('red');
        } else {
          $('.glyphicon').removeClass('red');
        }
      //  $scope.$apply();

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