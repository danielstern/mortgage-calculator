<!doctype HTML>
<!-- Copyright 2013 danielstern.ca - -->

<html> 
<head>
	<title>Daniel Stern Financial Calculator</title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
	<script src="lib/less/less-1.3.3.min.js"></script>	
	<script data-main="js/main" src="lib/require/require.js"></script>	
	
	<!--<link rel="stylesheet" type="text/css" href="styles/bootstrapcalculator.css">-->
	<link rel="stylesheet" type="text/css" href="lib/bootstrap/css/bootstrap.css">
	<link rel="stylesheet" type="text/css" href="lib/bootstrap/slider/css/slider.css"
	
</head>
<body id="body-{{colorScheme}}" ng-controller='MainCtrl'>
	<container  >
		<div class='container ng-cloak mainBody'>
			
			<div class='row'>

				<div class='col-md-5'>
					<div data-ng-include="'views/interface.html'"></div>
					
				</div>

				<div class='col-md-4'>
					<div data-ng-include="'views/charts.html'"></div>
				</div>

				<div class='col-md-3'>
					<div data-ng-include="'views/settings.html'"></div>	
				</div>

			</div>

		</div>
	</container>
	<ng:view></ng:view>
</body>
<?php include('php/analytics.html') ; ?>
</html>