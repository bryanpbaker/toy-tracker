toyTrackerApp.controller('NavController', ['$scope', '$state', 'authService', 'wishlistService', function($scope, $state, authService, wishlistService) {

	$scope.logout = function() {
		authService.auth.$unauth();
		// wishlistService.uid = '';
		$state.go('login');
	}

	authService.auth.$onAuth(function(authData){
		if(authData){
			$scope.loggedIn = true;
		} else{
			$scope.loggedIn = false;
		}

		console.log($scope.loggedIn);
	});

}]);