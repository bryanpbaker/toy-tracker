toyTrackerApp.controller('RegisterController', ['$scope', '$state', 'authService', function($scope, $state, authService) {

	var regCtrl = this;

	regCtrl.user = {
		email: '',
		password: ''
	};

	regCtrl.register = function() {
		authService.auth.$createUser(regCtrl.user).then(function() {
			regCtrl.login();
		}, function(error) {
			regCtrl.error = error;
		});
	};

	regCtrl.login = function() {
		authService.auth.$authWithPassword(regCtrl.user).then(function(auth) {
			$state.go('search');
		}, function(error) {
			regCtrl.error = error;
		});
	};

}]);
