define("settings", ['underscore'], function (_) {
return {	defaults:{
   startingValue:100,
   finalValue:120,
   interestRate:10,
   recurringPayment:0,
   numMonths:120,
   depositFreq:'monthly',
   finalValue:500,
	},
	fields:[
	  {
	    name:"Starting Value",
	    key:"startingValue",
	    primer:"$"
	  },
	  {
	    name:"Interest Rate",
	    key:"interestRate",
	    chaser:"%",
	    selected:"true"
	  },
	  {
	    name:"Time",
	    key:"numMonths",
	    chaser:" months"
	  },
	  {
	    primer:"$",
	    name:"Final Value",
	    key:"finalValue",

	}]
}
})