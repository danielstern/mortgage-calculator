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
				<div class='col-md-6'>
					<table class='table table-bordered'>
						<tr ng-repeat="field in fields" ng-controller='CalcFieldCtrl' ng-class="{'success':field.selected}" >
							<td class="col-lg-2" ng-click="handleRowClick(field.key)">	
								{{field.name}}
							</td>
							<td class="col-lg-2">
								<input type="number" class='form-control' ng-model='cp[field.key]' ng-disabled="field.selected" id='{{field.name}}' name='{{field.name}}'/>							
							</td>
							<td class="col-lg-2">
								{{cp[field.key]}}
							</td>
						</tr>
					</table>
					</div>
				<div class='col-md-3'>
					<img src='../misc/teacher2.jpg' class="img-thumbnail" width='auto' height='auto'>
				</div>

			</div>
		</div>
	</container>
	<ng:view></ng:view>
	
</body>
<!--<script src='js/calculator.js'></script>-->
<?php include('php/analytics.html') ; ?>
</html>