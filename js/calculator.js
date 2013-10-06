define("Calculator", ['underscore'], function (_) {

  return function Calculator() {

    var calc = this;
    calc.values = {};
    var values = calc.values;

    values.startingValue = 100;
    values.finalValue = 120;
    values.interestRate = 10;
    values.recurringPayment = 0;
    values.timeFrame = 10;
    values.timeKind = 'yearly';
    values.depositFreq = 'monthly';
    values.finalValue = 500;

    //var vo = new CalcValueObject(values);

    

    calc.calculate = function(cp) {
   
    	var differences = _.whatsChanged(values,cp);
    	var key = _(differences).chain().keys().first().value();
    
			_.extend(values, differences);

			var returnObj = {};
			returnObj.finalValue = calc.getFinalValue();
		
			returnObj.interestRate = calc.getInterestRate();
			returnObj.numMonths = calc.getNumMonths();

      var vo = new CalcValueObject(returnObj);

			return vo;

    	
    }

    var CalcValueObject = function(_values) {

      var values = {};

      if (_values) _.extend(values,_values);

      this.getValues = function() {
        if (values.numMonths) values.numYears = values.numMonths/12;
        return values;
      }
    }



    calc.numMonths = function () {
      return calc.timeFrame * 12
    }

    calc.targetAccuracy = 0.0001; // increases the accuracy of the compound interest calculator. the higher it is, the higher you must make precision, which affects performance.
    calc.calculatorPrecision = 250; // this is an important value as it determines how often you get the "?"
    // Affects the accuracy of the compound interest guess at the cost of processing power.

    calc.allPfsCalculated = [];

    calc.getFinalValue = function () {

      calc.allPfsCalculated = [];

      var numMonths = values.timeFrame;

      if(values.timeKind == 'yearly') {
        numMonths *= 12;
      }

      var p1 = Number(values.startingValue);
      var pf = p1;

      var pr = Number(values.recurringPayment);
      var yearlyInterestRate = Number(values.interestRate);

      var monthlyInterestRate = yearlyInterestRate / 12;

      var i = 1 + (monthlyInterestRate / 100);

      if(!p1) p1 = 0;
      if(!i) i = 1;
      if(!pr) pr = 0;

      var monthsThru = 0;

      for(var n = 0; n < numMonths; n++) {
        if(values.depositFreq == 'monthly') pf += pr;

        //pf = pf * i;     // for calculating payments at the beginning of the period

        if(values.depositFreq == 'yearly') {

          if(monthsThru == 0) pf += pr;
          monthsThru++;
          if(monthsThru == 12) monthsThru = 0;

        }

        pf = pf * i;

        calc.allPfsCalculated.push(pf);

      }

      return pf.toFixed(2);

    }

    calc.getInterestRate = function() {

      var numMonths = values.timeFrame;

      if(values.timeKind == 'yearly') {
        numMonths *= 12;
      }

      var apf = values.finalValue;

      var p1 = Number(values.startingValue);
      var pf = p1;
      var pr = Number(values.recurringPayment);
      var i = 1.01;

      if(pf < p1) return 0;

      var monthsThru = 0;

      var guessI = i;

      var precision;
      var targetPrecision = 10; // less than this amount apart	

      var count = calc.calculatorPrecision;
      var adjustmentAmount = 0.01;

      if(numMonths > 100000) {

        $('#interestError').html('That time frame is too long!')

        return "?";
      }

      while(count > 0) {
        calc.allPfsCalculated = [];

        for(var n = 0; n < numMonths; n++) {
          if(values.depositFreq == 'monthly') pf += pr;

          if(values.depositFreq == 'yearly') {

            if(monthsThru == 0) pf += pr;
            monthsThru++;
            if(monthsThru == 12) monthsThru = 0

          }

          pf = pf * guessI;
          calc.allPfsCalculated.push(pf);

        }

        if(apf > pf) {

          guessI += adjustmentAmount;

        } else {

          guessI -= adjustmentAmount;

        }
        precision = Math.abs(pf - apf);

        if(precision < calc.targetAccuracy) {
          break;
        }


        adjustmentAmount *= 0.9;
        pf = p1;

        count--;
      }

      i = ((guessI - 1) * 12) * 100;
      //	console.log("How many guesses did it take?: " + count);
      if(precision > 10 || isNaN(precision || count >= calc.calculatorPrecision)) return "?"
      $('#interestError').html('');
      return i.toFixed(3);

    }

    calc.getNumMonths = function() {

      //return "?";

      var apf = values.finalValue;
      var p1 = Number(values.startingValue);
      var pf = p1;
      var pr = Number(values.recurringPayment);
      var i = Number(values.interestRate) / 12;
      //	console.log("Interest rate per month?" , i);

      var monthsThru = 0;

      var guessNumMonths = 120;

      var precision;
      var targetPrecision = 10; // less than this amount apart	

      var timeTargetAccuracy = 50;

      var count = calc.calculatorPrecision;
      var adjustmentAmount = 15;

      while(count > 0) {
        calc.allPfsCalculated = [];
        var numMonths = guessNumMonths;

        for(var n = 0; n < numMonths; n++) {
          if(values.depositFreq == 'monthly') pf += pr;

          if(values.depositFreq == 'yearly') {

            if(monthsThru == 0) pf += pr;
            monthsThru++;
            if(monthsThru == 12) monthsThru = 0

          }

          pf = pf * (1 + (i / 100));

          calc.allPfsCalculated.push(pf);

        }

        if(apf > pf) {

          guessNumMonths += adjustmentAmount;

        } else {

          guessNumMonths -= adjustmentAmount;

        }

        precision = Math.abs(pf - apf);

        if(precision < timeTargetAccuracy) break; 

        adjustmentAmount *= 0.95;
        pf = p1;

        count--;
      }

      var temporalAccuracyTarget = pf * 0.22;

      if(isNaN(precision) || precision > temporalAccuracyTarget) return "?"
      return numMonths.toFixed(3);

    }

    calc.sanitize = function (i) {
      if(i == '?' || !i) return '?';
      return Number(i);
    }

 

  }
})