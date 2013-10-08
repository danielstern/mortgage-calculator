define(['angular','Calculator','jquery','settings','Chartmaster'] , function (angular, Calculator, $, settings, Chartmaster) {

  return angular.module('calculatorApp' , [])
  .controller('CalculatorController', ['$scope','chartService', function($scope , chartService) {

    $scope.cp  = settings.defaults;
    $scope.fields = settings.fields;
    $scope.colorScheme = 'jedi';
    $scope.showRecurring = settings.showRecurring;
    $scope.settingsOpen = settings.settingsOpen;

    var cp = $scope.cp ;
    var calc = new Calculator();

    $scope.$watchCollection('cp', function(){
      $scope.handleCalcInput();
    })

    $scope.$watchCollection('settings',function(){
      console.log("Settings changed....")
    })

    $scope.changeColorScheme = function (scheme) {
      $scope.colorScheme = scheme;
    }


    $scope.handleCalcInput = function() {
      var selectedField = _.find($scope.fields, function(field){return field.selected});
      var key = selectedField.key;
      var directive = key;
      var value = calc.calculate(_.clone(cp),directive);

      cp[key] = Number(value);
    
    chartService.updateChart($scope.getFullStats());
}


  $scope.getFullStats = function () {
    var stats = {};
    stats = _.clone(cp);
    stats.values = calc.getStatistics(cp).values;
    return stats;
  }
    _.defer(function(){chartService.updateChart($scope.getFullStats())});

  $scope.handleRowClick = function(thing) {

    var field = _.find($scope.fields, function(field){return field.key == thing})
    if (field.noCalc) return;
    _.each($scope.fields,function(field){
      field.selected = false
    })

    field.selected = true;
  }

  $('.chart-container > *').click(function(e){
    $(this).find('.thumb').toggleClass('pinned');
  })


}])
.controller('ChartCtrl', ['$scope', 'chartService', function($scope, chartService) {

   function updateChart (stats) {
   Chartmaster.barChart(stats.values, "#chart-container-1");
   Chartmaster.donut([stats.startingValue,stats.finalValue, stats.recurringPayment * stats.numMonths], "#chart-container-2")
 }

 chartService.updateChart = updateChart;
 console.log("Ctrl init",chartService)

}])

.service('chartService', function() {
  this.updateChart = function() {
    return console.warn("this is the old service...")
  };
});

});