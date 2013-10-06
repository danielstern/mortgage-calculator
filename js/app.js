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

    $scope.select = function(val) {
      console.log("Selected...",val);
    }


    $scope.fields = [
    {
      name:"Starting Value",
      key:"startingValue"
    },
    {
      name:"Interest Rate",
      key:"interestRate",
     /* radio:[
      {
        name:'Annually',
        value:'annually'
      },
      {
        name:'Monthly',
        value:'monthly'
      }]*/
    },
    {
      name:"Timeframe",
      key:"timeFrame"
    },
    {
      name:"Final Value",
      key:"finalValue",
      selected:"true"
    },

    ]

    $scope.handleCalcInput = function(thing) {
  var values = calc.calculate(cp);
  console.log('values?',values);

  }

  $scope.handleRowClick = function(thing) {
    console.log('clicked row', thing);
  }


}])
.controller('CalcFieldCtrl', ['$scope', function($scope) {


 /*_.defer(function(){
  $('#slider-'+$scope.field.key).slider()
  .on('slide',function(e) {

    $scope.cp[$scope.field.key] = e.value;
    $scope.$apply();
  });
}
)

*/
}]);
});