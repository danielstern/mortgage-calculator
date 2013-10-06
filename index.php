<!doctype HTML>
<!-- Copyright 2013 danielstern.ca - -->

<html ng-app> 
<head>
	<title>Responsive Calculator</title>
	<meta name="viewport" content="width=device-width; initial-scale=1.0;">
	<script data-main="js/main" src="lib/require/require.js"></script>	
	
	<link rel="stylesheet" type="text/css" href="styles/bootstrapcalculator.css">
	<link rel="stylesheet" type="text/css" href="lib/bootstrap/css/bootstrap.css">
	<link rel="stylesheet" type="text/css" href="lib/bootstrap/css/bootstrap-responsive.css">
	
</head>
<body>
	<container>

	<?php include('php/includes/navbar.php') ; ?>
		<div class='container ng-cloak mainBody'>
		<h3>{{calcname}}</h3>
	
		
		Starting Value
		<input type="number" ng-model='startingValue' value='100' type='text'/>

		Recurring Deposit

		<input type="number" ng-model='recurringPayment' type='text'>
		<div class='btn-group' data-toggle='buttons-radio'>
			<button class='btn' ng-click="depositFreq = 'yearly'">Yearly</button>
			<button class='btn btn-active active' ng-click="depositFreq = 'monthly'">Monthly</button>
		</div>


		<label class='{{calculatorKind}}-timeFrame-mode-only timeFrame-mode-only'>{{timeFrame}}</label> 
		<input type="number" class='{{calculatorKind}}-timeFrame-mode-hide' ng-model='timeFrame' type='text'>

		<div class='btn-group' data-toggle='buttons-radio'>
			<button class='btn active' ng-click="timeKind = 'yearly'">Years</button>
			<button class='btn' ng-click="timeKind = 'monthly'">Months</button>
		</div>

			Interest Rate 
			<label class='{{calculatorKind}}-interest-mode-only interest-mode-only'>{{interestRate}}%</label> 
			<input type="number" ng-model='interestRate' class='{{calculatorKind}}-interest-mode-hide' type='text'>


		Net Value at End
		<label class='{{calculatorKind}}-net-value-only net-value-only'> {{finalValue | currency}} </label> 
		<input  type="number" class='{{calculatorKind}}-net-value-hide' ng-model='finalValue' type='text'>
	
	
	</div>

	</container>

<div class='chartHolder'>
<div id="chart" class='float-right' style="height: 400px; margin: 0 auto"></div>
</div>
	
</body>
<!--<script src='js/calculator.js'></script>-->
<?php include('php/analytics.html') ; ?>
</html>
