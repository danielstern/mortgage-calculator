define("Calculator", [''], function () {
  return function Calculator() {

    var calc = this;
    calc.calculatorKind = 'netValueMode'
    calc.calcname = "Net Value After Calculator";
    calc.startingValue = 100;
    calc.finalValue = 120;
    calc.interestRate = 10;
    calc.recurringPayment = 0;
    calc.timeFrame = 10;
    calc.timeKind = 'yearly';
    calc.depositFreq = 'monthly';
    //calc.finalValue = getFinalValue(calc);
    calc.finalValue = 500;

    calc.numMonths = function () {
      return calc.timeFrame * 12
    }

    calc.targetAccuracy = 0.0001; // increases the accuracy of the compound interest calculator. the higher it is, the higher you must make precision, which affects performance.
    calc.calculatorPrecision = 250; // this is an important value as it determines how often you get the "?"
    // Affects the accuracy of the compound interest guess at the cost of processing power.

    calc.allPfsCalculated = [];

    calc.getFinalValue = function () {

      calc.allPfsCalculated = [];

      var numMonths = calc.timeFrame;

      if(calc.timeKind == 'yearly') {
        numMonths *= 12;
      }

      var p1 = Number(calc.startingValue);
      var pf = p1;

      var pr = Number(calc.recurringPayment);
      var yearlyInterestRate = Number(calc.interestRate);

      var monthlyInterestRate = yearlyInterestRate / 12;

      var i = 1 + (monthlyInterestRate / 100);

      if(!p1) p1 = 0;
      if(!i) i = 1;
      if(!pr) pr = 0;

      var monthsThru = 0;

      for(var n = 0; n < numMonths; n++) {
        if(calc.depositFreq == 'monthly') pf += pr;

        //pf = pf * i;     // for calculating payments at the beginning of the period

        if(calc.depositFreq == 'yearly') {

          if(monthsThru == 0) pf += pr;
          monthsThru++;
          if(monthsThru == 12) monthsThru = 0;

        }

        pf = pf * i;

        //calc.allPfsCalculated[n] = pf;
        calc.allPfsCalculated.push(pf);

      }

      return pf.toFixed(2);

    }

    function getInterestRate() {

      var numMonths = calc.timeFrame;

      if(calc.timeKind == 'yearly') {
        numMonths *= 12;
      }

      var apf = calc.finalValue;

      var p1 = Number(calc.startingValue);
      var pf = p1;
      var pr = Number(calc.recurringPayment);
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
          if(calc.depositFreq == 'monthly') pf += pr;

          if(calc.depositFreq == 'yearly') {

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
          //  console.log("Good enough.", guessI);
          break;
        }

        //console.log(calc.allPfsCalculated)

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

    function getNumMonths(calc) {

      //return "?";

      var apf = calc.finalValue;
      var p1 = Number(calc.startingValue);
      var pf = p1;
      var pr = Number(calc.recurringPayment);
      var i = Number(calc.interestRate) / 12;
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
          if(calc.depositFreq == 'monthly') pf += pr;

          if(calc.depositFreq == 'yearly') {

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

        if(precision < timeTargetAccuracy) {
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

      if(isNaN(precision) || precision > temporalAccuracyTarget) return "?"
      return numMonths.toFixed(3);

    }

    calc.sanitize = function (i) {
      if(i == '?' || !i) return '?';
      return Number(i);
    }

 

  }
})