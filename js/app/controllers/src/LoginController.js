toyTrackerApp.controller('LoginController', ['$scope', 'authService', function($scope, authService) {

	$scope.auth = authService.auth;
	$scope.authData = 'no auth data';

	$scope.email = '';

	$scope.login = function(email, password) {
		authService.login(email, password);
	}

	$scope.auth.$onAuth(function(authData) {
		$scope.authData = authData;
	});

	console.log($scope.auth);

}]);
