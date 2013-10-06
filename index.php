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
	<container ng-controller='CalculatorController' >
		<div class='container ng-cloak mainBody'>
			<div class='row'>
				<div class='col-md-8'>
					<form role='form' class="form-horizontal">
						<div class="form-group" ng-repeat="field in fields" ng-controller='CalcFieldCtrl'>
							<label for="{{field.name}}" class="col-lg-3 control-label">	
								{{field.name}}
							</label>
							<div class="col-lg-2">
								<input type="number" class='form-control' ng-model='cp[field.key]' id='{{field.name}}' name='{{field.name}}'/>							
							</div>
							<div class="col-lg-1">
								{{cp[field.key]}}
							</div>
							<div class="col-lg-3">
								<button class='btn'>Select</btn>
							</div>
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