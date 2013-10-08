define(['app','settings'] , function (app, settings) {
  app.controller('SettingsCtrl', ['$scope','$rootScope', function($scope, $rootScope) {

  	$scope.settingsOpen = settings.settingsOpen;

  	$scope.$watch('colorScheme', function(e){
    	$scope.$parent.changeColorScheme($scope.colorScheme);
		})
		
  }])
})