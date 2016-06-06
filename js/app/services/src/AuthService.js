toyTrackerApp.service('authService', ['$firebaseAuth', function($firebaseAuth) {

	var ref = new Firebase('https://toy-tracker-app.firebaseio.com');
	this.auth = $firebaseAuth(ref);
	
	this.login = function(email, password) {
		this.authData = null;
		this.error = null;

		this.auth.$authWithPassword({
			email: email,
			password: password
		}).then(function(authData) {
			console.log(authData);
		}).catch(function(error) {
			console.error(error);
		});

	}



}]);