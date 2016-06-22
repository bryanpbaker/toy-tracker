toyTrackerApp.controller('DashboardController', ['$state', 'authService', '$scope', '$firebaseArray', function($state, authService, $scope, $firebaseArray) {

	var dashboardCtrl = this;

	var ref = new Firebase('https://toy-tracker-app.firebaseio.com/users/');
	$scope.wishlist = $firebaseArray(ref);

}]);
