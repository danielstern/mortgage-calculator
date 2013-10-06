define(['angular'] , function (angular) {

  return angular.module('calculatorApp' , [])
   .controller('calculatorController', ['$scope', function($scope) {

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