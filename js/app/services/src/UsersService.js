toyTrackerApp.service('usersService', ['$firebaseArray', 'FirebaseUrl', function($firebaseArray, FirebaseUrl) {

	this.usersRef = new Firebase(FirebaseUrl + 'users');

	this.users = $firebaseArray(this.usersRef);

	// add new user to users in db
	this.createProfile = function(uid, name, age, email, password) {
		this.users.$add({
			uid: uid,
			name: name,
			age: age,
			email: email
		});
	};

}]);