toyTrackerApp.service('usersService', ['$firebaseArray', 'FirebaseUrl', function($firebaseArray, FirebaseUrl) {

	// add new user to users in db
	this.createProfile = function(uid, name, age, email, password) {
		this.usersRef = new Firebase(FirebaseUrl + 'users/' + uid);
		console.log(uid);
		this.users = $firebaseArray(this.usersRef);
		this.users.$add();

		this.userName = name;
		this.userAge = age;
		this.userEmail = email;
	};

}]);