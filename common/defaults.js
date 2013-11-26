define(['underscore'], function (_) {
return {	defaults:{
   investmentValue:200000,
   downpayPercent:10,
   interestRate:7,
   downpay:21000,
   amortization:25,
   paymentWeekly: false,
   paymentBiWeekly: false,
   paymentMonthly: true,
   downpaySelected:true,
   propertyTax:5000,
   closingCosts:10000,
   maintenanceFee:500,
   compound:'Bi-Annually',
   freq:'monthly',
   payoff:'Pay Full Term',
   income:2200
   },
}
})