toyTrackerApp.service('wishlistService', ['$firebaseArray', 'authService', '$state', function($firebaseArray, authService, $state) {

	var wishlistService = this;


	// add toy to wishlist when button is clicked
	this.addToWishlist = function(toyName, toyPrice, onWishlist, toyThumbnail, toyReviewImage) {

		this.addingToy = true;

		this.wishlist.$add({
			name: toyName,
			price: toyPrice,
			onWishlist: onWishlist,
			thumbnailImage: toyThumbnail,
			reviewImage: toyReviewImage
		}).then(function() {
			this.addingToy = false;
		});
	};


	// remove toy to wishlist when button is clicked
	this.removeFromWishlist = function(id){
		this.wishlist.$remove(id);
	}

}]);