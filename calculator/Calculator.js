define(['underscore'], function (_) {

  return function Calculator(config) {

    var calc = this;

    calc.targetAccuracy = 0.0001; // increases the accuracy of the compound interest calculator. the higher it is, the higher you must make precision, which affects performance.
    calc.calculatorPrecision = 250; // this is an important value as it determines how often you get the "?"
    calc.allPfsCalculated = [];


    var values;

    calc.calculate = function (paramaters, directive) {

      console.log("Calculating", paramaters);
      res = calc.preflightAndGo(paramaters)
      return res;

    }

    calc.preflightAndGo = function (params) {
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

      params.investmentValue += params.closingCosts;

      var downPayment;
      if (params.downpayPercentSelected) {
        downPayment = (params.downpayPercent / 100) * params.investmentValue;
      } else {
        downPayment = params.downpay;
      }

      var r = calc.calculateMortgage(params.investmentValue, downPayment, interestRateHuman, amortizationWeeks, paymentFreq, compound, params.payoff);
      r.monthlyService = r.paymentMonthly;
      r.monthlyService += params.maintenanceFee;
      r.monthlyService += params.propertyTax / 12;

      r.net = params.income - r.monthlyService;
      return r;
      //return calc.classicMortgage(params.investmentValue, downPayment,interestRate, amortizationWeeks, paymentFreq);
    }


    calc.calculateMortgage = function (p1, dp, pih, pm, pfq, cpd, payoff) {
      console.log("Mortgage calculate!", arguments);
      var pi;
      switch (cpd) {
      case "monthly":
        pi = 1 + (pih / 100 / 12);
        break;
      case "annually":
        pi = 1 + (pih / 100 / 1);
        break;
      case "biAnnually":
        pi = 1 + (pih / 100 / 2);
        break;
      }
      console.log("PI?", pi)
    //  return;
      var r = {};
      var precision;
      var payOffSooner = false;
      var payStyle;

      console.log("Payoff?",payoff);
      if (payoff == "Pay Off Sooner") {
        payStyle = pfq;
        pfq = "monthly";
        payOffSooner = true;

      }

      var count = 1000;
      var totalpaid = 0;

      var pv = p1 - dp;
      r.pv = pv;
      r.dpp = dp / p1;

      var pve = pv;
      var adjustmentAmount = pve / 5000;
      //   var targetPrecision = pv / 500; // less than this amount apart  
      var targetPrecision = 5; // less than this amount apart  
      var weeks = pm * 4;

      var gmw;

      if (pfq == 'monthly') gmw = pv / 162.2; // don't even ask.
      if (pfq == 'biWeekly') gmw = pv / 344.4;
      if (pfq == 'weekly') gmw = pv / 344.8;
      // = pv / 161.2;
      while (count > 0) {

        for (i = 0; i < weeks; i++) {

          if (pfq == "weekly") {
            pve = pve - gmw;
            totalpaid += gmw;

          };

          if (i % 2 == 0) {
            if (pfq == "biWeekly") {
              pve = pve - gmw;
              totalpaid += gmw;
            };

          }


          if (i % 4 == 0) {

            if (pfq == "monthly") {
              pve = pve - gmw;
              totalpaid += gmw;
            };



            if (i != 0 && cpd == "monthly") {
              pve *= pi;
            }

          }

          if (i != 0 && i % 26 == 0) {
            if (cpd == "biAnnually") pve *= pi;
          }

          if (i != 0 && i % 52 == 0) {
            if (cpd == "annually") pve *= pi;
          }


        }


        precision = Math.abs(pve);

        //  console.log("precision?",precision);
        if (precision < targetPrecision) {
          break;
        }


        if (pve > 0) {

          gmw += adjustmentAmount;

        } else {

          gmw -= adjustmentAmount;

        }
        adjustmentAmount *= 0.99;

        pve = pv;
        totalpaid = 0;

        count--;

      }

      if (payOffSooner && payStyle != "monthly") {
        console.log("Paying off sooner",gmw,payStyle, cpd, pi);
        totalpaid = 0;
      //  return;
        pve = pv - gmw;
        for (i = 0; i < weeks; i++) {

          if (payStyle == "weekly") {
            pve -= gmw / 4;
            totalpaid += gmw / 4;
          }

          if (i != 0 && payStyle =="biWeekly" && i % 2 == 0) {
            pve -= gmw / 2;
            totalpaid += gmw / 2;
          }

          if (i % 4 == 0) {
            if (i != 0 && cpd == "monthly") {
              pve *= pi;
            }
          }

          if (i != 0 && i % 26 == 0) {
            if (cpd == "biAnnually") pve *= pi;
          }

          if (i != 0 && i % 52 == 0) {
            if (cpd == "annually") pve *= pi;
          }

          //console.log("Pve at end of this year?",pve);
          if (pve < 1 ) {
            console.log ('paid off sooner,',totalpaid);
            console.log("i?",i,weeks);
            r.timeout = i;
            r.weeks = weeks;
            if (payStyle =="weekly") r.gmw = gmw / 4;
            if (payStyle =="biWeekly") r.gmw = gmw / 2;
            break;
          }

        }

      }

      if (payOffSooner && payStyle == "monthly" || !payOffSooner) {
         r.weeks = weeks;
         r.timeout = weeks;

      }

      r.gmw = r.gmw || gmw;
      r.paymentMonthly = undefined;
      if (pfq =="weekly") r.paymentMonthly = r.gmw * 4;
      if (pfq =="biWeekly") r.paymentMonthly = r.gmw * 2;
      if (pfq =="monthly") r.paymentMonthly = r.gmw;
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


    