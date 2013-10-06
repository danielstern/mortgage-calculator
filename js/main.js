require.config({
  paths: {
    jquery: '../lib/jquery/jquery-2.0.3.min',
    underscore: '../lib/underscore/underscore-min',
    'underscore.string': '../lib/underscore/underscore.string.min',
    angular: '../lib/angular/angular.min',
    bootstrap: '../lib/bootstrap/js/bootstrap.min',
    bootstrap_slider: '../lib/bootstrap/slider/js/bootstrap-slider'
  },
  shim: {
  	'underscore.string': {
	    exports: '_.str',
	  },
	  'bootstrap': {
	 	  deps: ['jquery'],
	  },
	  'bootstrap_slider': {
	 	  deps: ['bootstrap'],
	  },
	  'underscore': {
	  	deps: ['underscore.string'],
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
});

require([
	"jquery",
	"app",
	"angular",
	"bootstrap",
	"bootstrap_slider",
	"Utility",
	"Calculator",

	], function($, app, angular) {

		console.log('calculator booted.');
   	angular.bootstrap(document , ['calculatorApp']);
		
})

