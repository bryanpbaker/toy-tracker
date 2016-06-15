toyTrackerApp.controller('AuthController', ['$scope', '$state', 'authService', 'usersService',  function($scope, $state, authService, usersService) {

	var authCtrl = this;

	authCtrl.user = {
		email: '',
		password: ''
	};

	authCtrl.login = function() {
		authService.auth.$authWithPassword(authCtrl.user).then(function(auth) {
			$state.go('search');
		}, function(error) {
			authCtrl.error = error;
		});
	};


	

}]);



// $scope.auth = authService.auth;
// $scope.authData = 'no auth data';

// $scope.email = '';

// $scope.login = function(email, password) {
// 	authService.login(email, password);
// }

// $scope.auth.$onAuth(function(authData) {
// 	$scope.authData = authData;
// });

// console.log($scope.auth);