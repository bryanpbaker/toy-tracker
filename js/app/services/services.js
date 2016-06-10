toyTrackerApp.service('authService', ['$firebaseAuth', function($firebaseAuth) {

	var ref = new Firebase('https://toy-tracker-app.firebaseio.com');
	this.auth = $firebaseAuth(ref);
	
}]);


// this.login = function(email, password) {
// 	this.authData = null;
// 	this.error = null;

// 	this.auth.$authWithPassword({
// 		email: email,
// 		password: password
// 	}).then(function(authData) {
// 		console.log(authData);
// 	}).catch(function(error) {
// 		console.error(error);
// 	});

// }
toyTrackerApp.factory('Search', function() {

	
	
});
toyTrackerApp.service('usersService', ['$firebaseArray', 'FirebaseUrl', function($firebaseArray, FirebaseUrl) {

	this.usersRef = new Firebase(FirebaseUrl + 'users');

	this.users = $firebaseArray(this.usersRef);

	// add new user to users in db
	this.createProfile = function(uid, name, age, email) {
		this.users.$add({
			uid: uid,
			name: name,
			age: age,
			email: email
		});
	};

}]);
toyTrackerApp.service('wishlistService', ['$firebaseArray', function($firebaseArray) {

	// reference to firebase
	var ref = new Firebase('https://toy-tracker-app.firebaseio.com/users/');

	// define 'wishlist'
	this.wishlist = $firebaseArray(ref.child('wishlist'));
	

	// add toy to wishlist when button is clicked
	this.addToWishlist = function(toyName, toyPrice, onWishlist, toyThumbnail, toyReviewImage) {
		this.wishlist.$add({
			name: toyName,
			price: toyPrice,
			onWishlist: onWishlist,
			thumbnailImage: toyThumbnail,
			reviewImage: toyReviewImage
		});
	};


	// remove toy to wishlist when button is clicked
	this.removeFromWishlist = function(id){
		this.wishlist.$remove(id);
	}

}]);