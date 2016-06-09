toyTrackerApp.controller('RegisterController', ['$scope', '$state', 'authService', 'usersService', function($scope, $state, authService, usersService) {

	var regCtrl = this;

	regCtrl.user = {
		name: '',
		age: '',
		email: '',
		password: ''
	};

	// bind to users in db 
	regCtrl.users = usersService.users;


	// register new user
	regCtrl.register = function() {
		authService.auth.$createUser({
			email: regCtrl.user.email, 
			password: regCtrl.user.password

		}).then(function() {
			regCtrl.login();
		}, function(error) {
			regCtrl.error = error;
		});
	};

	// login registered user
	regCtrl.login = function() {
		authService.auth.$authWithPassword(regCtrl.user).then(function(auth) {
			$state.go('search');
		}, function(error) {
			regCtrl.error = error;
		});
	};

	// add new user to users in db
	regCtrl.createProfile = function() {
		usersService.users.$add({
			name: regCtrl.user.name,
		});
	};

}]);
