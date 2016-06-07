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
toyTrackerApp.service('wishlistService', ['$firebaseArray', function($firebaseArray) {

	// reference to firebase
	var ref = new Firebase('https://toy-tracker-app.firebaseio.com/');

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

		console.log( toyName + ' has been added to your wishlist!');
	};


	// remove toy to wishlist when button is clicked
	this.removeFromWishlist = function(id){
		this.wishlist.$remove(id);
	}

}]);