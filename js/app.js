define(['angular','Calculator','jquery','settings','Chartmaster'] , function (angular, Calculator, $, settings, Chartmaster) {

  return angular.module('calculatorApp' , [])
  .controller('CalculatorController', ['$scope', function($scope) {

    $scope.cp  = settings.defaults;
    $scope.showTimeAs = settings.showTimeAs;
    $scope.fields = settings.fields;

    var cp = $scope.cp ;

    var calc = new Calculator();


    $scope.$watch('showTimeAs',function(thing){
      console.log("Changed showtimeas...",thing);     
    })



    $scope.$watchCollection('cp', function(thing){

      $scope.handleCalcInput(thing);
    })


    $scope.handleCalcInput = function(thing) {

      var _calcParams = _.clone(cp);
      if ($scope.showTimeAs == 'years') _calcParams.numMonths = cp.numYears * 12;

      var values = calc.calculate(cp);

      var selectedField = _.find($scope.fields, function(field){return field.selected})
      var key = selectedField.key;
      cp[key] = Number(values[key]);


      $scope.updateChart(calc.getStatistics());

    }

    $scope.updateChart = function (stats) {

      Chartmaster.barChart(stats.values, "#chart-container-1");
      Chartmaster.donut([stats.startingValue,stats.finalValue], "#chart-container-2")
      
    }

    $scope.handleRowClick = function(thing) {

      _.each($scope.fields,function(field){
        field.selected = false
      })
      
      var field = _.find($scope.fields, function(field){return field.key == thing})
      field.selected = true;
    }

    $('.chart-container > *').click(function(e){
      $(this).find('.thumb').toggleClass('pinned');
    })

    $('#toggle-settings').click(function(e){
      $('#settings').toggleClass('open');
    });

   // console.log('showtime...',$scope.showTimeAs)

    
  }])

});