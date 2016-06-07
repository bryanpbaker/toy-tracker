toyTrackerApp.controller('NavController', ['$scope', '$state', 'authService', function($scope, $state, authService) {

	$scope.logout = function() {
		authService.auth.$unauth();
	}

}]);