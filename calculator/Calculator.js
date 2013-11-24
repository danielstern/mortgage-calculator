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
      return res;

    }

    calc.preflightAndGo = function(params) {
     // console.log("Preflighting...",params);
      var amortizationWeeks = params.amortization * 12;
      var paymentFreq = 'weekly';
      if (params.paymentBiWeekly) paymentFreq = 'biWeekly';
      if (params.paymentMonthly) paymentFreq = 'monthly';

      var interestRateMonthly = 1 + ((params.interestRate / 100) / 12)

      var downPayment;
      if(params.downpayPercentSelected) {
        downPayment = (params.downpayPercent / 100) * params.investmentValue;
      } else {
        downPayment = params.downpay;
      }

      return calc.calculateMortgage(params.investmentValue, downPayment,interestRateMonthly, amortizationWeeks, paymentFreq);
    }

    calc.calculateMortgage = function(p1, dp, pi, pm, pfq) {
       console.log("Mortgage go!",arguments);
       var r = {};
      var precision;
      var targetPrecision = 100; // less than this amount apart  

      var count = 1000;
      var adjustmentAmount = 50;
      var totalpaid = 0;

       // phase 1
       var pv = p1 - dp;
       r.pv = pv;
       r.dpp = dp / p1;
       console.log("r", r);


      console.log("PV?",pv);
       var pve = pv;

       var gmw = pv / 100;
       while(count > 0) {
    //  console.log("Gmw?", gmw);
        totalpaid = 0;
         for (i = 0; i < pm ; i++) {
         // console.log("PVE?",pve);
         // console.log("week passes...");
          if (i == 0 || i%4 == 0) {
            if (pfq == "monthly") 
              {
                pve = pve - gmw
                totalpaid += gmw;
              };

            pve *= pi;

          }


          if (i == 0 || i%2 == 0) {
            if (pfq == "biWeekly") {pve = pve - gmw; totalpaid += gmw;};
          }

          if (pfq == "weekly") {pve = pve - gmw; totalpaid += gmw;};

        //  console.log("Pve at end of this week?",pve);
          if (pve < 0) break;

       }

    //   console.log("Our estimated value at end of term...",pve);

        if(pve > 0) {

          gmw += adjustmentAmount;

        } else {

          gmw -= adjustmentAmount;

        }
        precision = Math.abs(pve);

        if(precision < targetPrecision) {
          console.log("precision?",precision);
          break;
        }

        adjustmentAmount *= 0.99;
        pve = pv;

       count --;

     }

    console.log("what is pve?",pve);
    console.log("what is gmw?", gmw);

    r.gmw = gmw;
    r.totalpaid = totalpaid;
    r.interestPaid = totalpaid - pv;
    r.dp = dp;
    r.interestRatio = r.interestPaid / pv;

    return r;


    }
  }

     
})