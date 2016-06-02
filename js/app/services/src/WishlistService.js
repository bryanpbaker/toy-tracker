toyTrackerApp.service('wishlistService', ['$firebaseArray', function($firebaseArray) {

	// reference to firebase
	var ref = new Firebase('https://toy-tracker-app.firebaseio.com/');


	this.wishlist = $firebaseArray(ref.child('wishlist'));

	// ref.set({
	// 	wishlist: [
	// 		{
	// 			name: 'Test Toy',
	// 			price: 25,
	// 			onWishlist: true,
	// 			thumbnailImage: 'http://google.com/whatever',
	// 			reviewImage: 'http://google.com/whatever2'
	// 		}
	// 	]
	// });

	

	this.addToWishlist = function(toyName, toyPrice, onWishlist, toyThumbnail, toyReviewImage) {
		this.wishlist.$add({
			name: toyName,
			price: toyPrice,
			onWishlist: onWishlist,
			thumbnailImage: toyThumbnail,
			reviewImage: toyReviewImage
		});

		console.log(this.wishlist);

		console.log( toyName + ' has been added to your wishlist!');
	};

}]);