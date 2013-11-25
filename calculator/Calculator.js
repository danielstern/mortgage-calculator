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

      //var interestRateMonthly = 1 + ((params.interestRate / 100)) / 12;
      //var interestRate = params.interestRate / 100 / 12;
      var interestRateHuman = params.interestRate;

      var compound;
      switch (params.compound) {
        case "Bi-Weekly":
        compound = 'biWeekly';
        break;
        case "Monthly":
        compound = 'monthly';
        break;
        case "Bi-Monthly":
        compound = 'biMonthly';
        break;
        case "Annually":
        compound = 'annually';
        break;
        case "Bi-Annually":
        compound = 'biAnnually';
        break;
      }

      var downPayment;
      if(params.downpayPercentSelected) {
        downPayment = (params.downpayPercent / 100) * params.investmentValue;
      } else {
        downPayment = params.downpay;
      }

      return calc.calculateMortgage(params.investmentValue, downPayment,interestRateHuman, amortizationWeeks, paymentFreq, compound);
      //return calc.classicMortgage(params.investmentValue, downPayment,interestRate, amortizationWeeks, paymentFreq);
    }


    calc.calculateMortgage = function(p1, dp, pih, pm, pfq, cpd) {
      console.log("Mortgage calculate!",arguments);
      var pi;
      switch (cpd) {
        case "biWeekly":
        pi = 1 + (1 + ((pih - 1) / 24)) / 100;
        break;
        case "monthly":
        pi = 1 + (1 + ((pih - 1) / 12)) / 100;
        break;
        case "biMonthly":
        pi = 1 + (1 + ((pih - 1) / 6)) / 100;
        break;
        case "annually":
        pi = 1 + (1 + ((pih - 1) / 1)) / 100;
        break;
        case "biAnnually":
         pi = 1 + (1 + ((pih - 1) / 2)) / 100;
        break;
      }
      console.log("PI?",pi)
      return;
      var r = {};
      var precision;

      var count = 1000;
      var totalpaid = 0;

       var pv = p1 - dp;
       r.pv = pv;
       r.dpp = dp / p1;

       var pve = pv;
      var adjustmentAmount = pve / 5000;
    //   var targetPrecision = pv / 500; // less than this amount apart  
       var targetPrecision = 250; // less than this amount apart  
       var weeks = pm * 4;

       var gmw;

       if (pfq == 'monthly') gmw = pv / 162.2;  // don't even ask.
       if (pfq == 'biWeekly') gmw = pv / 344.4;
       if (pfq == 'weekly') gmw = pv / 344.8;
       // = pv / 161.2;
       while(count > 0) {

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

            if (cpd =="monthly") pve *= pi;

          }


       }


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
        totalpaid = 0;

       count --;

     }

    r.gmw = gmw;
    r.totalpaid = totalpaid;
    r.interestPaid = totalpaid - pv;
    r.dp = dp;
    r.i = pi;
    r.interestRatio = r.interestPaid / pv;
    r.accuracy = precision;
    r.targetPrecision = targetPrecision;

    window.r = r;
    return r;


    }
  }

     
})

/*
    calc.classicMortgage = function(p1, dp, pi, pm, pfq) {

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
    */