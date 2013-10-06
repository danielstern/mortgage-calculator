<!doctype HTML>
<!-- Copyright 2013 danielstern.ca - -->

<html> 
<head>
	<title>Responsive Calculator</title>
	<!--<meta name="viewport" content="width=device-width; initial-scale=1.0;">-->
	<script data-main="js/main" src="lib/require/require.js"></script>	
	
	<link rel="stylesheet" type="text/css" href="styles/bootstrapcalculator.css">
	<link rel="stylesheet" type="text/css" href="lib/bootstrap/css/bootstrap.css">
	<link rel="stylesheet" type="text/css" href="lib/bootstrap/css/bootstrap-responsive.css">
	
</head>
<body>
	<container  ng-controller='CalculatorController' >
	<div class='container ng-cloak mainBody'>
		<div class='row'>
		<div class='span6'>

	
  <form class='well' >
		
		<h3>{{cp.calcname}}</h3>
		<label>Starting Value
		</label>
			<input type="number" ng-change='handleCalcInput("cp:" + cp.startingValue)' ng-model='cp.startingValue' type='text'/>


		<label>Recurring Deposit
		</label>
		<input type="number" ng-model='cp.recurringPayment'>
		<div class='btn-group' data-toggle='buttons-radio'>
			<button class='btn'>Yearly</button>
			<button class='btn btn-active active'>Monthly</button>
		</div>


		<label>Timeframe
		</label> 
		{{cp.timeFrame}}
			<input type="number" ng-model='cp.timeFrame' type='text'>

			<div class='btn-group' data-toggle='buttons-radio'>
				<button class='btn active'>Years</button>
				<button class='btn'>Months</button>
			</div>

			<label>Interest Rate (%)
				<div class='value'>{{cp.interestRate}}</label> 
				<input type="number" ng-model='cp.interestRate'>
	</div>
		</label>


		<label>Net Value at End
		</label> 
		<input  type="number" ng-model='cp.finalValue' type='text'>
		<div class='value'>
			 {{cp.finalValue | currency}} 
		</div>
	</form>
	
	
	</div>
	<div class='span3'>
		<li>
			<a data-toggle='collapse' data-target='.nav-collapse' ng-click="calculatorKind = 'netValueMode'" id='navNetValueButton'>Net Value Calculator</a>
		</li>
		<li>
			<a  data-toggle='collapse' data-target='.nav-collapse' ng-click="calculatorKind = 'interestMode'">Compound Rate of Return Calculator</a>	
		</li>
		<li>
			<a data-toggle='collapse' data-target='.nav-collapse' ng-click="calculatorKind = 'timeFrameMode'">Timeframe Calculator</a>	  
		</li>	
	</div>
</div>
</div>
	</container>

<div class='chartHolder'>
<div id="chart" class='float-right' style="height: 400px; margin: 0 auto"></div>
</div>
<ng:view></ng:view>
	
</body>
<!--<script src='js/calculator.js'></script>-->
<?php include('php/analytics.html') ; ?>
</html>
