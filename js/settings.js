define("settings", ['underscore'], function (_) {
return {	defaults:{
   startingValue:100,
   finalValue:120,
   interestRate:10,
   numMonths:60,
   recurringPayment:0,
   depositFreq:'monthly',
   finalValue:500,
	},
	showTimeAs:'years',
	showRecurring:'show',
	fields:[
	  {
	    name:"Starting Value",
	    key:"startingValue",
	    primer:"$",
	    step:100
	  },
	   {
	    name:"Monthly Payment",
	    key:"recurringPayment",
	    primer:"$",
	  },
	  {
	    name:"Interest Rate",
	    key:"interestRate",
	    chaser:"%",
	    selected:"true"
	  },
	  {
	    name:"Time (Months)",
	    key:"numMonths",
	    chaser:' months',
	    step:5
	  },
	 /* {
	    name:"Time (Years)",
	    key:"numYears",
	    chaser:' years'
	  },*/
	  {
	    primer:"$",
	    name:"Final Value",
	    key:"finalValue",
	    step:100

	}]
}
})