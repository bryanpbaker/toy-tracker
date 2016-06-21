toyTrackerApp.service('wishlistService', ['$firebaseArray', 'authService', '$state', function($firebaseArray, authService, $state) {

	var wishlistService = this;

	// wishlistService.currentUser = authService.auth.$getAuth();
	

	// var ref = new Firebase('https://toy-tracker-app.firebaseio.com/users/' + wishlistService.currentUser.uid);
	// wishlistService.wishlist = $firebaseArray(ref.child('wishlist'));
	


	// // add toy to wishlist when button is clicked
	// this.addToWishlist = function(toyName, toyPrice, onWishlist, toyThumbnail, toyReviewImage) {

	// 	// this.addingToy = true;

	// 	wishlistService.wishlist.$add({
	// 		name: toyName,
	// 		price: toyPrice,
	// 		onWishlist: onWishlist,
	// 		thumbnailImage: toyThumbnail,
	// 		reviewImage: toyReviewImage
	// 	}).then(function() {
	// 		// this.addingToy = false;
	// 	});
	// };


	// remove toy to wishlist when button is clicked
	// this.removeFromWishlist = function(id){
	// 	this.wishlist.$remove(id);
	// }

}]);