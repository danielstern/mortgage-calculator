<body ng-controller="calculator">

	<container ng-model='main' >

	<?php include('/includes/navbar.php') ; ?>
	<div class='container ng-cloak mainBody'>
	<h3 class='tk-ff-cocon-web-pro'>{{calcname}}</h3>
	
	<?php include('/includes/startingValue.php') ; ?>
	<?php //include('/includes/recurringDeposit.php') ; ?>
	<?php include('/includes/timeFrame.php') ; ?>
	<?php include('/includes/interestRate.php') ; ?>
	<?php include('/includes/finalValue.php') ; ?>
	
	<div id="fb-root"></div>
<script>(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/all.js#xfbml=1";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));</script>

<div class="fb-like" data-href="http://www.danielstern.ca/calculator" data-send="true" data-width="450" data-show-faces="true"></div>

<script type="text/javascript" src="https://apis.google.com/js/plusone.js"></script>
<g:plusone></g:plusone>
	
	
	
	
	
	</div>

	</container>
	<spacey/>