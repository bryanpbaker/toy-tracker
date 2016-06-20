toyTrackerApp.controller('AuthController', ['$scope', '$state', 'authService', 'usersService', 'wishlistService',  function($scope, $state, authService, usersService, wishlistService) {

	var authCtrl = this;

	authCtrl.user = {
		email: '',
		password: ''
	};

	authCtrl.login = function() {
		authService.auth.$authWithPassword(authCtrl.user).then(function(auth) {
			$state.go('home');

			authCtrl.userData = auth;
			authCtrl.uid = authCtrl.userData.uid;

			// get correct wishlist
			wishlistService.getWishlist(authCtrl.uid);

		}, function(error) {
			authCtrl.error = error;
		});
	};

}]);

