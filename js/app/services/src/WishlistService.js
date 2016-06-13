toyTrackerApp.service('wishlistService', ['$firebaseArray', 'usersService', 'authService', function($firebaseArray, usersService, authService) {

	// reference to firebase
	var ref = new Firebase('https://toy-tracker-app.firebaseio.com/users/');

	// define 'wishlist'
	// this.wishlist = $firebaseArray(ref.child(this.userId + '/wishlist'));


	this.findWishlist = function(userId) {
		var userObj = usersService.users.$getRecord('9bd5229a-7de1-49ed-8344-e22a2e63dd2f');

		console.log(userObj);
	}


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