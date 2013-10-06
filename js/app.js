define(['angular','Calculator','jquery'] , function (angular, Calculator, $) {

  return angular.module('calculatorApp' , [])
   .controller('CalculatorController', ['$scope', function($scope) {

    var calc = new Calculator();
   // console.log("made clalculator",calc);

    $scope.calculatorProperties = {};
    $scope.cp =  $scope.calculatorProperties;
    var cp = $scope.calculatorProperties;

 //   cp.calculatorKind = 'netValueMode'
//    cp.calcname = "Net Value After Calculator";
    cp.startingValue = 100;
    cp.finalValue = 120;
    cp.interestRate = 10;
    cp.recurringPayment = 0;
    cp.timeFrame = 10;
    cp.timeKind = 'yearly';
    cp.depositFreq = 'monthly';
    //calc.finalValue = getFinalValue(calc);
    cp.finalValue = 500;

    // bingo...
    $scope.$watchCollection('cp', function(thing){
      //console.log('Cp changed.',thing);
      $scope.handleCalcInput(thing);
    })

    $scope.handleCalcInput = function(thing) {
      console.log("Handling calculator input...",thing);
      var values = calc.calculate(cp);
      console.log('values?',values);
      
    }

    $('#slider1').slider()
    .on('slide',function(e) {
      console.log(e.value);
      $scope.cp.startingValue = e.value;
      $scope.$apply();
    });

  }])
});