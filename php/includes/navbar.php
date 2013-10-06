<div class='navbar  navbar-fixed-top'> 
	<div class='navbar-inner animate {{calculatorKind}}-color'>
		<div class="container">
			<a class='brand'>
				Responsive Calculator
			</a>
			<a data-toggle='collapse' data-target='.nav-collapse' class='btn btn-navbar'>
				<span class='icon-bar'></span>
				<span class='icon-bar'></span>
				<span class='icon-bar'></span>
			</a>
			<div class='nav-collapse'>
				<ul class='nav pull-right'>
					<li>
						<a data-toggle='collapse' data-target='.nav-collapse' ng-click="calculatorKind = 'netValueMode'" id='navNetValueButton'>Net Value Calculator</a>
					</li>
					<li>
						<a  data-toggle='collapse' data-target='.nav-collapse' ng-click="calculatorKind = 'interestMode'">Compound Rate of Return Calculator</a>	
					</li>
					<li>
						<a data-toggle='collapse' data-target='.nav-collapse' ng-click="calculatorKind = 'timeFrameMode'">Timeframe Calculator</a>	  
					</li>	
				</ul>
				
			</div>	
		</div>
	</div>
</div>
<div class='hidden-phone pull-right'>
</div>