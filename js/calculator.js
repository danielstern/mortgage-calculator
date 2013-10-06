
  function calculator($scope,$http) {

  
  // default values
  $scope.calculatorKind = 'netValueMode'
  $scope.calcname = "Net Value After Calculator";
  $scope.startingValue = 100;
  $scope.finalValue = 120;
  $scope.interestRate = 10;
  $scope.recurringPayment = 0;
  $scope.timeFrame = 10;
  $scope.timeKind = 'yearly';
  $scope.depositFreq = 'monthly';
  //$scope.finalValue = getFinalValue($scope);
  $scope.finalValue = 500;
  
  $scope.numMonths = function() {return $scope.timeFrame * 12}
  
  $scope.targetAccuracy = 0.0001; // increases the accuracy of the compound interest calculator. the higher it is, the higher you must make precision, which affects performance.
  $scope.calculatorPrecision = 250;   // this is an important value as it determines how often you get the "?"
  // Affects the accuracy of the compound interest guess at the cost of processing power.
  
  $scope.allPfsCalculated = [];
  
  function getFinalValue($scope) {
  
  
	$scope.allPfsCalculated = [];
    
    var numMonths = $scope.timeFrame;
	
	if ($scope.timeKind == 'yearly') {
	  numMonths *= 12;
	}
	
	var p1 = Number($scope.startingValue);
	var pf = p1;
	
	var pr = Number($scope.recurringPayment);	
	var yearlyInterestRate = Number($scope.interestRate);
	
    var monthlyInterestRate =  yearlyInterestRate / 12;
	
	var i = 1 + (monthlyInterestRate / 100);
	
	if (!p1) p1 = 0;
	if (!i) i = 1;
	if (!pr) pr = 0;
	
	
    var monthsThru = 0;

	for (var n = 0; n < numMonths; n++) {
	   if ($scope.depositFreq == 'monthly') pf += pr;
	   
	   //pf = pf * i;     // for calculating payments at the beginning of the period
	   
	   if ($scope.depositFreq == 'yearly') {
	   
	      if (monthsThru == 0) pf += pr;
		  monthsThru ++;
		  if (monthsThru == 12) monthsThru = 0;
	   
	   }
	   
	   pf = pf * i;
	   
	   //$scope.allPfsCalculated[n] = pf;
		$scope.allPfsCalculated.push(pf);
	   
	}

	
	return pf.toFixed(2);
      
  }

  
  
  function getInterestRate($scope) {
  
  
    var numMonths = $scope.timeFrame;
	
	if ($scope.timeKind == 'yearly') {
	  numMonths *= 12;
	}

	var apf = $scope.finalValue;
	
	var p1 = Number($scope.startingValue);
	var pf = p1;		
	var pr = Number($scope.recurringPayment);
    var i = 1.01;	
	
	if (pf < p1) return 0;
	
	var monthsThru = 0;
	
	var guessI = i;
	
	var precision;
	var targetPrecision = 10; // less than this amount apart	

	var count =   $scope.calculatorPrecision;
	var adjustmentAmount = 0.01;
	
	if (numMonths > 100000) {
	
	$('#interestError').html('That time frame is too long!')	
	
	
	return "?";}
	
	while (count > 0)
	{
		$scope.allPfsCalculated = [];
	  
		for (var n = 0; n < numMonths; n++) {
		   if ($scope.depositFreq == 'monthly') pf += pr;
		   
		   
		   if ($scope.depositFreq == 'yearly') {
		      
			  if (monthsThru == 0) pf += pr;
			  monthsThru ++;
			  if (monthsThru == 12) monthsThru = 0
		   
		   }  
		   
			pf = pf * guessI;
			$scope.allPfsCalculated.push(pf);
		   
		}

		if (apf > pf) {
		
		   guessI += adjustmentAmount;
		
		}
		else {
		
		  guessI -= adjustmentAmount;
		
		}
		precision = Math.abs(pf - apf);
		
		if (precision < $scope.targetAccuracy)
		{
		//  console.log("Good enough.", guessI);
		  break;
		}
		
		//console.log($scope.allPfsCalculated)
		
		adjustmentAmount *= 0.9;
		pf = p1;	
		
		count--;
	}
		
	
	i = ((guessI - 1) * 12) * 100;	
//	console.log("How many guesses did it take?: " + count);
	if (precision > 10 || isNaN(precision || count >= $scope.calculatorPrecision)) return "?"
	$('#interestError').html('');
	return i.toFixed(3);
      
  }
  
  function getNumMonths($scope) {

	//return "?";
	
	
	var apf = $scope.finalValue;
	var p1 = Number($scope.startingValue);
	var pf = p1;		
	var pr = Number($scope.recurringPayment);
    var i = Number($scope.interestRate) / 12;	
//	console.log("Interest rate per month?" , i);
		
	var monthsThru = 0;
	
	var guessNumMonths = 120;
	
	var precision;
	var targetPrecision = 10; // less than this amount apart	
	
	var timeTargetAccuracy = 50;

	var count =   $scope.calculatorPrecision;
	var adjustmentAmount = 15;
	
	
	while (count > 0)
	{
		$scope.allPfsCalculated = [];
		var numMonths = guessNumMonths;
	  
		for (var n = 0; n < numMonths; n++) {
		   if ($scope.depositFreq == 'monthly') pf += pr;
		   
		   
		   if ($scope.depositFreq == 'yearly') {
		      
			  if (monthsThru == 0) pf += pr;
			  monthsThru ++;
			  if (monthsThru == 12) monthsThru = 0
		   
		   }
		   
			pf = pf * (1 + (i / 100));
			
			$scope.allPfsCalculated.push(pf);
		   
		}

		if (apf > pf) {
		
		   guessNumMonths += adjustmentAmount;
		
		}
		else {
		
		  guessNumMonths -= adjustmentAmount;
		
		}
		
		precision = Math.abs(pf - apf);
		
		if (precision < timeTargetAccuracy)
		{
		//  console.log("Good enough.", guessNumMonths);
		  break;
		}
		
		adjustmentAmount *= 0.95;
		pf = p1;	
		
		count--;
	}
	
	//console.log('Precision?', precision)
	var temporalAccuracyTarget = pf * 0.22;
	//console.log('temporal accuracy?' , temporalAccuracyTarget)
	
	
	if (isNaN(precision) || precision > temporalAccuracyTarget) return "?"
	return numMonths.toFixed(3);
      
  }
  
  $scope.sanitize = function(i) {
	if (i == '?' || !i) return '?';
	return Number(i);
	}
  

  
  var changeWatch = $scope.$watch('finalValue+interestRate+timeFrame+startingValue+recurringPayment+timeKind+depositFreq+endValueInput+calculatorKind', function (value) {

//	changeWatch();
	updateValues();
//	changeWatch = $scope.$watch('finalValue+interestRate+timeFrame+startingValue+recurringPayment+timeKind+depositFreq+endValueInput+calculatorKind', updateValues);
	
    console.warn('Global watch trigger')
	
	
    
  })
  
  function updateValues() {
	 // console.info('updating values now')
	  if ($scope.calculatorKind == 'netValueMode') {
        $scope.finalValue = $scope.sanitize(getFinalValue($scope));
		window.drawNetValueChart($scope.numMonths(),[{name:'Net Value Over Time',data:$scope.allPfsCalculated}],'#c14844')
		}
		
		if ($scope.calculatorKind == 'interestMode')	{
		  $scope.interestRate = $scope.sanitize(getInterestRate($scope));
		 try {  window.drawNetValueChart($scope.numMonths(),[{name:'Net Value Over Time',data:$scope.allPfsCalculated}],'#334d19') } catch (e){console.log("FAIL!")}
		  

		}
		
		if ($scope.calculatorKind == 'timeFrameMode')	{
		  var numMonths = getNumMonths($scope);
		  if ($scope.timeKind == 'yearly' && !isNaN(numMonths)) {
			numMonths /= 12;
		  }
		  if (!isNaN(numMonths)) {
			
			numMonths = Number(numMonths).toFixed(2);
		  }
		  $scope.timeFrame = $scope.sanitize(numMonths);
		  window.drawNetValueChart($scope.numMonths(),[{name:'Net Value Over Time',data:$scope.allPfsCalculated}])
		  

		}
	
	}
  


	$scope.$watch('calculatorKind', function (value) {
	
		if ($scope.calculatorKind == 'netValueMode') {

			//$scope.calcname = "Net Value After Calculator";
			$scope.calcname = "How Much Will I Have If...";
		}
		else if ($scope.calculatorKind == 'interestMode') {	

			//$scope.calcname = "Rate of Return Calculator";
			$scope.calcname = "What Is My Rate of Return?";
		}
	
		else if ($scope.calculatorKind == 'timeFrameMode') {	

	    $scope.calcname = "How Long Will It Take?";
    }
	
	})
	
}