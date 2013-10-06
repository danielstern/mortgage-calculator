<!doctype HTML>
<!-- Copyright 2013 danielstern.ca - -->

<html> 
<head>
	<title>Daniel Stern Financial Calculator</title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
	<script data-main="js/main" src="lib/require/require.js"></script>	
	
	<link rel="stylesheet" type="text/css" href="styles/bootstrapcalculator.css">
	<link rel="stylesheet" type="text/css" href="lib/bootstrap/css/bootstrap.css">
	<link rel="stylesheet" type="text/css" href="lib/bootstrap/slider/css/slider.css"
	
</head>
<body>
	<container   ng-controller='CalculatorController' >
		<div class='container ng-cloak mainBody'>
			<div class='row'>
				<div class='col-md-6'>

					<form role='form'  class='well'>

						<h3>{{cp.calcname}}</h3>
						<div class="form-group">
							<label>Starting Value
							</label>
							<input class="form-control" type="number"ng-model='cp.startingValue' type='text'/>
						</div>

						<div class="form-group">
							<label>Recurring Deposit
							</label>
							<input class="form-control" type="number" ng-model='cp.recurringPayment'>
							<div class='btn-group' data-toggle='buttons'>
								<label class="btn btn-primary">
									<input type="radio" name="options" id="option1"> Yearly
								</label>
								<label class="btn btn-primary active">
									<input type="radio" name="options" id="option2"> Monthly
								</label>

							</div>
<input id='slider1' type="text" class="span2" value="" data-slider-min="-20" data-slider-max="20" data-slider-step="1" data-slider-value="-14" data-slider-orientation="vertical" data-slider-selection="after"data-slider-tooltip="hide">

						</div>


						<div class="form-group">
							<label>Timeframe
							</label> 
							<input class="form-control" type="number" ng-model='cp.timeFrame' type='text'>

							<div class='btn-group' data-toggle='buttons'>
								<label class="btn active btn-primary">
									<input type="radio" name="options" id="option1"> Yearly
								</label>
								<label class="btn btn-primary">
									<input type="radio" name="options" id="option2"> Monthly
								</label>
							</div>
						</div>

						<div class="form-group">
							<label>Interest Rate (%)
							</label>
							{{cp.interestRate}}
							<input class="form-control" type="number" ng-model='cp.interestRate'>
						</div>

						<div class="form-group">
							<label>Net Value at End
							</label> 
							{{cp.finalValue | currency}} 
							<input class="form-control" type="number" ng-model='cp.finalValue' type='text'>
						</div>
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
