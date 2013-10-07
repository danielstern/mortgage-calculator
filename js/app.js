define(['angular','Calculator','jquery','settings','Chartmaster'] , function (angular, Calculator, $, settings, Chartmaster) {

  return angular.module('calculatorApp' , [])
  .controller('CalculatorController', ['$scope', function($scope) {

    $scope.cp  = settings.defaults;
    $scope.showTimeAs = settings.showTimeAs;
    $scope.fields = settings.fields;
    $scope.colorScheme = 'jedi';

    var cp = $scope.cp ;
    $scope.numYears = cp.numMonths / 12;

    var calc = new Calculator();


    $scope.$watchCollection('cp', function(){

      $scope.handleCalcInput();
    })


    $scope.handleCalcInput = function() {

      var directive = _.find($scope.fields, function(field){return field.selected}).key;

      var cpClone = _.clone(cp);

 

      var values = calc.calculate(cpClone,directive);


      var selectedField = _.find($scope.fields, function(field){return field.selected})
      var key = selectedField.key;

        cp[key] = Number(values);


      $scope.updateChart();

    }

    $scope.updateChart = function (stats) {

      var stats = {};
      stats = _.clone(cp);
      stats.values = calc.getStatistics().values;

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