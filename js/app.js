define(['angular','Calculator','jquery','settings','Chartmaster'] , function (angular, Calculator, $, settings, Chartmaster) {

  return angular.module('calculatorApp' , [])
  .controller('CalculatorController', ['$scope', function($scope) {

    $scope.cp  = settings.defaults;
    $scope.fields = settings.fields;
    $scope.colorScheme = 'jedi';

    var cp = $scope.cp ;
    var calc = new Calculator();

    $scope.$watchCollection('cp', function(){
      $scope.handleCalcInput();
    })


    $scope.handleCalcInput = function() {
      var selectedField = _.find($scope.fields, function(field){return field.selected});
      var key = selectedField.key;
      var directive = key;
      var value = calc.calculate(_.clone(cp),directive);

      cp[key] = Number(value);
      $scope.updateChart();
    }

    $scope.updateChart = function () {

      var stats = {};
      stats = _.clone(cp);
      stats.values = calc.getStatistics(cp).values;

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

    
  }])

});