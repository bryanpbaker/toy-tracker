toyTrackerApp.controller('RegisterController', ['$scope', '$state', 'authService', 'usersService', function($scope, $state, authService, usersService) {

	var regCtrl = this;

	// bind to users in db 
	regCtrl.users = usersService.users;

	// login registered user
	regCtrl.login = function() {
		authService.auth.$authWithPassword(regCtrl.user).then(function(auth) {
			$state.go('search');
		}, function(error) {
			regCtrl.error = error;
		});
	};

	// run login function from usersController
	regCtrl.createProfile = function(uid, fullName, age, email, password) {
		usersService.createProfile(uid, fullName, age, email, password);
	}


	// register new user
	regCtrl.register = function(uid, fullName, age, email, password) {
		authService.auth.$createUser({
			email: regCtrl.user.email, 
			password: regCtrl.user.password

		}).then(function(user) {
			regCtrl.login();
			regCtrl.createProfile(user.uid, fullName, age, email, password);
			alert('User ' + fullName + ' has been created!');

		}, function(error) {
			regCtrl.error = error;
		});
	};


}]);
