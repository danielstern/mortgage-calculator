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
        $scope.payment = output.payment;
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

        $scope.analytics = calculationService.getStats();

        console.log("analytics?",$scope.analytics);
      }
    }
  ])
})