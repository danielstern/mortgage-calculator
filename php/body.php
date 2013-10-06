<body ng-controller="calculator">

	<container ng-model='main' >

	<?php include('/includes/navbar.php') ; ?>
	<div class='container ng-cloak mainBody'>
	<h3 class='tk-ff-cocon-web-pro'>{{calcname}}</h3>
	
	<?php include('/includes/startingValue.php') ; ?>
	<?php include('/includes/recurringDeposit.php') ; ?>
	<?php include('/includes/timeFrame.php') ; ?>
	<?php include('/includes/interestRate.php') ; ?>
	<?php include('/includes/finalValue.php') ; ?>
	
	
	</div>

	</container>
	<spacey/>