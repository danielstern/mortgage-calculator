define(['angular','Calculator'] , function (angular, Calculator) {

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



       /*
  var changeWatch = calc.$watch('finalValue+interestRate+timeFrame+startingValue+recurringPayment+timeKind+depositFreq+endValueInput+calculatorKind', function (value) {

//  changeWatch();
  updateValues();
//  changeWatch = calc.$watch('finalValue+interestRate+timeFrame+startingValue+recurringPayment+timeKind+depositFreq+endValueInput+calculatorKind', updateValues);
  
    console.warn('Global watch trigger')
  
  
    
  })*/
    /*
  function updateValues() {
   // console.info('updating values now')
    if (calc.calculatorKind == 'netValueMode') {
        calc.finalValue = calc.sanitize(getFinalValue(calc));
    window.drawNetValueChart(calc.numMonths(),[{name:'Net Value Over Time',data:calc.allPfsCalculated}],'#c14844')
    }
    
    if (calc.calculatorKind == 'interestMode')  {
      calc.interestRate = calc.sanitize(getInterestRate(calc));
     try {  window.drawNetValueChart(calc.numMonths(),[{name:'Net Value Over Time',data:calc.allPfsCalculated}],'#334d19') } catch (e){console.log("FAIL!")}
      

    }
    
    if (calc.calculatorKind == 'timeFrameMode') {
      var numMonths = getNumMonths(calc);
      if (calc.timeKind == 'yearly' && !isNaN(numMonths)) {
      numMonths /= 12;
      }
      if (!isNaN(numMonths)) {
      
      numMonths = Number(numMonths).toFixed(2);
      }
      calc.timeFrame = calc.sanitize(numMonths);
      window.drawNetValueChart(calc.numMonths(),[{name:'Net Value Over Time',data:calc.allPfsCalculated}])
      

    }
  
  }*/

    /*  calc.$watch('calculatorKind', function (value) {
  
    if (calc.calculatorKind == 'netValueMode') {

      //calc.calcname = "Net Value After Calculator";
      calc.calcname = "How Much Will I Have If...";
    }
    else if (calc.calculatorKind == 'interestMode') { 

      //calc.calcname = "Rate of Return Calculator";
      calc.calcname = "What Is My Rate of Return?";
    }
  
    else if (calc.calculatorKind == 'timeFrameMode') {  

      calc.calcname = "How Long Will It Take?";
    }
  
  })*/

  }])
});