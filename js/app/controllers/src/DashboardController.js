toyTrackerApp.controller('DashboardController', ['$state', 'auth', 'profile', function($state, auth, profile) {

	var dashboardCtrl = this;

	dashboardCtrl.profile = profile;

	dashboardCtrl.updateProfile = function() {

		dashboardCtrl.profile.email = auth.password.email;

	};

}]);
