define("settings", ['underscore'], function (_) {
return {	defaults:{
   startingValue:100,
   finalValue:120,
   interestRate:10,
   recurringPayment:0,
   numMonths:120,
   numYears:10,
   depositFreq:'monthly',
   finalValue:500,
	},
	showTimeAs:'years',
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
	  },
	  {
	    primer:"$",
	    name:"Final Value",
	    key:"finalValue",

	}]
}
})