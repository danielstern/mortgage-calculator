define(['angular','Calculator','jquery','settings','Chartmaster'] , function (angular, Calculator, $, settings, Chartmaster) {

  return angular.module('calculatorApp' , [])
  .controller('CalculatorController', ['$scope', function($scope) {

    console.log("initialize app,",settings)

   $scope.cp  = settings.defaults;
   var cp = $scope.cp ;

    var calc = new Calculator();

    $scope.$watchCollection('cp', function(thing){
      $scope.handleCalcInput(thing);
    })

    $scope.fields = settings.fields;

    $scope.handleCalcInput = function(thing) {

      var values = calc.calculate(cp);

      var selectedField = _.find($scope.fields, function(field){return field.selected})
      var key = selectedField.key;
      cp[key] = parseInt(values[key]);

      $scope.updateChart(calc.getChartValues());

    }

    $scope.updateChart = function (values) {
    //  console.log("Updating with...",values);
  //    Chartmaster.mightyCircles(values);
        Chartmaster.barChart(values);
      //Chartmaster.makeSimpleLineGraph(values);
    }

  $scope.handleRowClick = function(thing) {
    console.log('clicked row', thing);
    _.each($scope.fields,function(field){field.selected = false})
 
    var field = _.find($scope.fields, function(field){return field.key == thing})
    field.selected = true;
  }


  }])
});