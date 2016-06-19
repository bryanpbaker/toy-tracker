toyTrackerApp.controller('RegisterController', ['$scope', '$state', 'authService', 'usersService', 'wishlistService', function($scope, $state, authService, usersService, wishlistService) {

	var regCtrl = this;

	// bind to users in db 
	regCtrl.users = usersService.users;

	// login registered user
	regCtrl.login = function() {
		authService.auth.$authWithPassword(regCtrl.user).then(function(auth) {
			regCtrl.userData = auth;
			regCtrl.uid = regCtrl.userData.uid;

			wishlistService.uid = regCtrl.uid;


			$state.go('search');
		}, function(error) {
			regCtrl.error = error;
		});
	};


	// register new user
	regCtrl.register = function(uid, fullName, age, email, password) {
		authService.auth.$createUser({
			email: regCtrl.user.email, 
			password: regCtrl.user.password

		}).then(function(user) {
			regCtrl.login();
			usersService.createProfile(user.uid, fullName, age, email, password);
			
			wishlistService.getWishlist(user.uid);

		}, function(error) {
			regCtrl.error = error;
		});
	};


}]);
