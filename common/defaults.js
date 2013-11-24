define(['underscore'], function (_) {
return {	defaults:{
   startingValue:100,
   finalValue:120,
   interestRate:10,
   numMonths:60,
   recurringPayment:10,
   depositFreq:'monthly',
   finalValue:1000,
	},
	settingsOpen:false,
	fields:[
	  {
	    name:"House Value",
	    key:"startingValue",
	    primer:"$",
	    step:25
	  },
	   {
	    name:"Down Payment",
	    key:"recurringPayment",
	    primer:"$",
	    noCalc:true
	  },
	  {
	    name:"Interest Rate",
	    key:"interestRate",
	    chaser:"%",
	    selected:"true"
	  },
	  {
	    name:"Mortgage Term",
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