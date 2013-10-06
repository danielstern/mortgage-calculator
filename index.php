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
				<div class='col-md-4'>

					<form role='form'  class='well'>

						<div class="form-group" ng-repeat="field in fields">
						<label>{{field.name}}</label>
							<label>{{cp[field.key]}}
							</label>
							<input class="form-control span1 col-md-2" type="number"ng-model='cp[field.key]' type='text'/>							
							<div class='btn-group' data-toggle='buttons' >
								<label class="btn btn-primary" ng-repeat="option in field.radio">
									<input type="radio" name="options" value='{{option.value}}' id="option1"> {{option.name}}
								</label>
							</div>
						</div>

						<!--<input id='slider1' type="text" class="" value="" data-slider-min="0" data-slider-max="1000" data-slider-step="1" data-slider-value="100" data-slider-orientation="horizontal" data-slider-selection="after"data-slider-tooltip="show">-->
			<!--				<label>Starting Value
						<div class="form-group">
							</label>
							<label>{{cp.startingValue}}
							</label>
							<input class="form-control span1 col-md-2" type="number"ng-model='cp.startingValue' type='text'/>
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
						</div>-->
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
