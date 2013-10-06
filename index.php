<!doctype HTML>
<!-- Copyright 2013 danielstern.ca - -->

<html> 
<head>
	<title>Daniel Stern Financial Calculator</title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
	<script data-main="js/main" src="lib/require/require.js"></script>	
	
	<link rel="stylesheet" type="text/css" href="styles/bootstrapcalculator.css">
	<link rel="stylesheet" type="text/css" href="lib/bootstrap/css/bootstrap.css">
	
</head>
<body>
	<container   ng-controller='CalculatorController' >
	<div class='container ng-cloak mainBody'>
		<div class='row'>
		<div class='col-md-6'>

	
  <form class='well' >
		
		<h3>{{cp.calcname}}</h3>
		<label>Starting Value
		</label>
			<input type="number"ng-model='cp.startingValue' type='text'/>


		<label>Recurring Deposit
		<input type="number" ng-model='cp.recurringPayment'>
		<div class='btn-group' data-toggle='buttons-radio'>
			<button class='btn'>Yearly</button>
			<button class='btn btn-active active'>Monthly</button>
		</div>
		</label>


		<label>Timeframe
			<input type="number" ng-model='cp.timeFrame' type='text'>

			<div class='btn-group' data-toggle='buttons-radio'>
				<button class='btn active'>Years</button>
				<button class='btn'>Months</button>
			</div>
		</label> 

			<label>Interest Rate (%)
				<div class='value'>{{cp.interestRate}}
				<input type="number" ng-model='cp.interestRate'>
			</div>
			</label>


		<label>Net Value at End
		<input  type="number" ng-model='cp.finalValue' type='text'>
		<div class='value'>
			 {{cp.finalValue | currency}} 
		</div>
		</label> 
	</form>
	
	
	</div>
	 <div class='col-md-3'>
        <img src='../misc/teacher2.jpg' class="img-thumbnail" width='auto' height='auto'>
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
