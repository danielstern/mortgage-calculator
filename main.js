require.config({
  paths: {
    jquery: 'common/lib/jquery/jquery-2.0.3.min',
    underscore: 'common/lib/underscore/underscore-min',
    underscore_string: 'common/lib/underscore/underscore.string.min',
    angular: 'common/lib/angular/angular.min',
    bootstrap: 'common/lib/bootstrap/js/bootstrap.min',
    d3: 'common/lib/d3/d3.min',
  },
  shim: {
  	'underscore_string': {
	    exports: '_.str',
	  },
	  'bootstrap': {
	 	  deps: ['jquery'],
	  },
	  'underscore': {
	  	deps: ['underscore_string'],
	    exports: '_',
	    init: function(_str) {

	    	_.mixin(_str.exports());

	    }
	  },
	  'angular': {
	      exports: 'angular'
	  },
	},
	urlArgs: "k=" + parseInt(Math.random() * 1000).toString(16),
	priority: [
		'angular'
	],
	map: {
  '*': {
    'css': 'common/lib/require-css/css' // or whatever the path to require-css is
  	}
	}
});

require([
	"jquery",
	"app",
	"angular",
	"d3",
	"bootstrap",

	"common/defaults",
	"common/Utility",
	
	"settings/SettingsCtrl",
	
	"interface/InterfaceCtrl",

	"charts/ChartCtrl",
	"charts/chartService",
	"charts/Chartmaster",

	"calculator/calculationService",
	"calculator/Calculator",

	], function($, app, angular) {

   	angular.bootstrap(document , ['calculatorApp']);
		
})

