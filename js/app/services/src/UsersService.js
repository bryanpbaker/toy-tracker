toyTrackerApp.service('usersService', ['$firebaseArray', 'FirebaseUrl', function($firebaseArray, FirebaseUrl) {

	this.usersRef = new Firebase(FirebaseUrl + 'users');

	this.users = $firebaseArray(this.usersRef);

}]);