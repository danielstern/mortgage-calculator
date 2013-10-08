 define(['app'] , function (app) {
   app.controller('SettingsCtrl', ['$scope','$rootScope', function($scope, $rootScope) {
    	$scope.settingsOpen = true;
    	$scope.$watch('colorScheme', function(e){
      	$scope.$parent.changeColorScheme($scope.colorScheme);
  		})
  }])
})