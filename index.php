<!doctype HTML>
<!-- Copyright 2013 danielstern.ca - -->

<html> 
<head>
	<title>Daniel Stern Financial Calculator</title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
	<script src="lib/less/less-1.3.3.min.js"></script>	
	<script data-main="js/main" src="lib/require/require.js"></script>	
	
	<link rel="stylesheet" type="text/css" href="styles/bootstrapcalculator.css">
	<link rel="stylesheet" type="text/css" href="lib/bootstrap/css/bootstrap.css">
	<link rel="stylesheet" type="text/css" href="lib/bootstrap/slider/css/slider.css"
	
</head>
<body id="body-{{colorScheme}}" ng-controller='CalculatorController'>
	<container  >
		<div class='container ng-cloak mainBody'>
			
			<div class='row'>
				<div class='col-md-5'>
					<table class='table table-bordered white-bg'>
						<tr ng-repeat="field in fields"  ng-class="{'success':field.selected}" ngIf="field.display != 'hide'">
							<td class="col-lg-2" ng-click="handleRowClick(field.key)">	
								{{field.name}}
							</td>
							<td class="col-lg-2">
								<input type='number' ng-disabled="field.selected" class='form-control' ng-model='cp[field.key]'/>					
							</td>
							<td class="col-lg-2">
								{{field.primer}}
								<span>{{cp[field.key]}}</span>
								<span ng-bind="field.chaser"></span>
							</td>
						</tr>
					</table>
				</div>

				<div class='col-md-4'>
					<div class='chart-container'>
						<div id='chart-container-1' class='inline-block'>
							<div class='thumb'>
								<div class='frame'>
								</div>
							</div>
						</div>
						<div id='chart-container-2' class='inline-block'>
							<div class='thumb'>
								<div class='frame'>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class='col-md-3'>
					<form class='well' id='settings'>
						<div id='toggle-settings'>
							<button class='btn btn-large btn-default'>
						<span class='glyphicon glyphicon-wrench rotate90'></span>
						<span class='glyphicon glyphicon-cog rotate180'></span>
					</button>
					</div>
							<div class='form-group '>
							<div class='radio'>
								<label>
									<input type="radio" ng-model="colorScheme" value='jedi' name="options" checked data-toggle='active'>Color Scheme &ndash; Jedi
								</label>
							</div>
							<div class='radio'>
								<label>
									<input type="radio" ng-model="colorScheme" value='sith' name="options">Color Scheme &ndash; Sith
								</label>
							</div>
						</div>
					
					</form>
				</div>
			</div>

		</div>
	</container>
	<ng:view></ng:view>
	
</body>
<?php include('php/analytics.html') ; ?>
</html>