toyTrackerApp.service('authService', ['$firebaseAuth', function($firebaseAuth) {

	var ref = new Firebase('https://toy-tracker-app.firebaseio.com');
	this.auth = $firebaseAuth(ref);

}]);
