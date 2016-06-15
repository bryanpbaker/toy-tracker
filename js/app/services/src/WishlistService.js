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