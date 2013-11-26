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
   propertyTax:0,
   closingCosts:0,
   maintenanceFee:0,
   compound:'Bi-Annually',
   freq:'monthly',
   payoff:'Pay Full Term',
   income:0
   },
}
})