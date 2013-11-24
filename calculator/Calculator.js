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

      var downPayment;
      if(params.downpayPercentSelected) {
        downPayment = (params.downpayPercent / 100) * params.investmentValue;
      } else {
        downPayment = params.downpay;
      }

      return calc.calculateMortgage(params.investmentValue, downPayment,interestRateMonthly, amortizationWeeks, paymentFreq);
    }

    calc.classicMortgage = function(p1, dp, pi, pm, pfq) {
/*
        var pv = p1 - dp;

        var tv = pv;
        console.log("Tv?",tv);
        for (var i = 0; i<pm;i++) {
          tv *= pi;
          console.log("Tv now...",tv);
        }

        var ti = tv - pv;
        console.log("This is how much sweet interest you will owe us:",ti,"interest:",pi);
        return;
*/

    }

    calc.calculateMortgage = function(p1, dp, pi, pm, pfq) {
      console.log("Mortgage calculate!",arguments);
       var r = {};
      var precision;
      var targetPrecision = 100; // less than this amount apart  

      var count = 1000;
      var adjustmentAmount = 50;
      var totalpaid = 0;

       var pv = p1 - dp;
       r.pv = pv;
       r.dpp = dp / p1;

       var pve = pv;
       var weeks = pm * 4;

       var gmw = pv / 50;
       while(count > 0) {

        totalpaid = 0;
         for (i = 0; i < weeks ; i++) {
          

          if (i%52 ==0) {
           // semi-annual stuff... 
          // console.log("Pve this year?",pve);
          }


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
          //  console.log("Month beginning,",i);
            if (pfq == "monthly") 
            {
                pve = pve - gmw;
                totalpaid += gmw;
            };

            pve *= pi;

          }

       //   if (pve < -1000) break;

       }

       console.log("Our estimated value at end of term with ipayment",i, gmw,pve);

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

        adjustmentAmount *= 0.99;
        pve = pv;

       count --;

     }

  //  console.log("what is pve?",pve);
   // console.log("what is gmw?", gmw);

    r.gmw = gmw;
    r.totalpaid = totalpaid;
    r.interestPaid = totalpaid - pv;
    r.dp = dp;
    r.i = pi;
    r.interestRatio = r.interestPaid / pv;

    window.r = r;
    return r;


    }
  }

     
})