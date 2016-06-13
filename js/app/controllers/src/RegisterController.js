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

	// login registered user
	regCtrl.login = function() {
		authService.auth.$authWithPassword(regCtrl.user).then(function(auth) {
			$state.go('search');
		}, function(error) {
			regCtrl.error = error;
		});
	};

	// run login function from usersController
	regCtrl.createProfile = function(uid, name, age, email) {
		usersService.createProfile(uid, name, age, email);
	}


	// register new user
	regCtrl.register = function(name, age, email) {
		authService.auth.$createUser({
			email: regCtrl.user.email, 
			password: regCtrl.user.password

		}).then(function(user) {
			regCtrl.login();
			regCtrl.createProfile(user.uid, name, age, email);
			
		}, function(error) {
			regCtrl.error = error;
		});
	};


}]);
