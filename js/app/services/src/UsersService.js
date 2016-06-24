toyTrackerApp.service('usersService', ['$firebaseArray', 'FirebaseUrl', '$firebaseObject', function($firebaseArray, FirebaseUrl, $firebaseObject) {

	// add new user to users in db
	this.createProfile = function(uid, name, age, email, password) {
		this.usersRef = new Firebase(FirebaseUrl + 'users/' + uid);
		console.log(uid);
		this.users = $firebaseArray(this.usersRef);
		this.users.$add();

		var ref = new Firebase('https://toy-tracker-app.firebaseio.com/users/' + uid );
		this.profile = $firebaseObject(ref.child('profile'));

		this.profile.name = name,
		this.profile.age = age,
		this.profile.email = email
		this.profile.$save();
	};

}]);