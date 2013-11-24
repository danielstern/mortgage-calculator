define(['underscore'], function (_) {

  return function Calculator(config) {

    var calc = this;
     
    calc.targetAccuracy = 0.0001; // increases the accuracy of the compound interest calculator. the higher it is, the higher you must make precision, which affects performance.
    calc.calculatorPrecision = 250; // this is an important value as it determines how often you get the "?"
    calc.allPfsCalculated = [];


    var values;

    calc.calculate = function(paramaters, directive) {
  
      console.log("Calculating", paramaters);
      res = calc.preflightAndGo(paramaters)
      return;

    }

    calc.preflightAndGo = function(params) {
     // console.log("Preflighting...",params);
      var amortizationWeeks = params.amortization * 12;
      var paymentFreq = 'monthly';
      if (params.paymentBiWeekly) paymentFreq = 'biWeekly';
      if (params.paymentMonthly) paymentFreq = 'monthly';

      var interestRatePercent = 1 + (params.interestRate / 100)

      var downPayment;
      if(params.downpayPercentSelected) {
        downPayment = (params.downpayPercent / 100) * params.investmentValue;
      } else {
        downPayment = params.downpay;
      }

      calc.calculateMortgage(params.investmentValue, downPayment,interestRatePercent, amortizationWeeks, paymentFreq);
    }

    calc.calculateMortgage = function(p1, dp, i, pm, pfq) {
      console.log("Mortgage go!",arguments)

    }
  }

     
})