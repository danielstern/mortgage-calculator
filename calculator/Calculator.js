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

      var interestRateMonthly = 1 + ((params.interestRate / 100)) / 12;
      var interestRate = params.interestRate / 100 / 12;

      var downPayment;
      if(params.downpayPercentSelected) {
        downPayment = (params.downpayPercent / 100) * params.investmentValue;
      } else {
        downPayment = params.downpay;
      }

      //return calc.calculateMortgage(params.investmentValue, downPayment,interestRateMonthly, amortizationWeeks, paymentFreq);
      return calc.classicMortgage(params.investmentValue, downPayment,interestRate, amortizationWeeks, paymentFreq);
    }

    calc.classicMortgage = function(p1, dp, pi, pm, pfq) {
      //var deno = pi;
      //var pdeno = Math.pow(deno, Term_of_Loan);
      //var loan_amount = (Monthly_payment * Term_of_Loan * 12) / pdeno;

      var r = {};

      var pr = p1 - dp;
      var pe = pm;
      var i = pi;

      console.log("Calculating mortgage...",pr,pe,i)

      var pay = pr * i / (1 - Math.pow(1 + i, -pe));

      console.log("Payment?",pay);
      r.gmw = pay;
      r.pv = pr;
      return r;

    }

    calc.calculateMortgage = function(p1, dp, pi, pm, pfq) {
      console.log("Mortgage calculate!",arguments);
       var r = {};
      var precision;
      var targetPrecision = 10; // less than this amount apart  

      var count = 1000;
      var adjustmentAmount = 50;
      var totalpaid = 0;

       var pv = p1 - dp;
       r.pv = pv;
       r.dpp = dp / p1;

       var pve = pv;
       var weeks = pm * 4;

       var gmw = pv / 161.2;
       while(count > 0) {

        totalpaid = 0;
         for (i = 0; i < weeks ; i++) {
          

          if (i == 0 || i%2 == 0) {
            if (pfq == "biWeekly")
            {
              pve = pve - gmw; 
              totalpaid += gmw;
            };
          }

          if (pfq == "weekly")
           {
            pve = pve - gmw; 
            totalpaid += gmw;
          };

          if (i == 0 || i%4 == 0) {

            if (pfq == "monthly") 
            {
                pve = pve - gmw;
                totalpaid += gmw;
            };

            pve *= pi;

          }

       //   if (pve < -1000) break;

       }

    //  console.log("Our estimated value at end of term with ipayment",i, gmw,pve);

        if(pve > 0) {

          gmw += adjustmentAmount;

        } else {

          gmw -= adjustmentAmount;

        }
        precision = Math.abs(pve);

      //  console.log("precision?",precision);
        if(precision < targetPrecision) {
          break;
        }

        adjustmentAmount *= 0.999;
        pve = pv;

       count --;

     }

    r.gmw = gmw;
    r.totalpaid = totalpaid;
    r.interestPaid = totalpaid - pv;
    r.dp = dp;
    r.i = pi;
    r.interestRatio = r.interestPaid / pv;
    r.accuracy = precision;

    window.r = r;
    return r;


    }
  }

     
})