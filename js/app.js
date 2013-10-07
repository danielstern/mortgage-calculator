define(['angular','Calculator','jquery','settings','Chartmaster'] , function (angular, Calculator, $, settings, Chartmaster) {

  return angular.module('calculatorApp' , [])
  .controller('CalculatorController', ['$scope', function($scope) {

    $scope.cp  = settings.defaults;
    $scope.showTimeAs = settings.showTimeAs;
    $scope.fields = settings.fields;

    var cp = $scope.cp ;
    $scope.numYears = cp.numMonths / 12;

    var calc = new Calculator();


    $scope.$watch('showTimeAs',function(thing){
      console.log("Changed showtimeas...",thing);     
    })




    $scope.$watchCollection('cp', function(){
      console.log("Cp changed...",cp);
      $scope.handleCalcInput();
    })


    $scope.handleCalcInput = function() {

      var directive = _.find($scope.fields, function(field){return field.selected}).key;

      var cpClone = _.clone(cp);
      cpClone.numMonths = $scope.numYears * 12;

      console.log("Calclulating...", cpClone)

      var values = calc.calculate(cpClone,directive);

    //  console.log("Got results...",values);
    //  return;

      var selectedField = _.find($scope.fields, function(field){return field.selected})
      var key = selectedField.key;
      if (key != 'numMonths') {
        cp[key] = Number(values);
      } else {
        if ($scope.showTimeAs == 'years') cp['numYears'] = Number(values) / 12;        
        if ($scope.showTimeAs == 'months') cp['numMonths'] = Number(values);        
      }

      //if ($scope.showTimeAs != 'years') cp['numYears'] = Number(values);


     // $scope.updateChart(calc.getStatistics());

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