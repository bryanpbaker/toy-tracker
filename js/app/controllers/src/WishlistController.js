toyTrackerApp.controller('WishlistController', ['$scope', '$firebaseArray', 'wishlistService', 'setWishlist', function($scope, $firebaseArray, wishlistService, setWishlist) {

		// $scope.wishlist = wishlistService.wishlist;

		var ref = new Firebase('https://toy-tracker-app.firebaseio.com/users/' + authData.uid);
		$scope.wishlist = $firebaseArray(ref.child('wishlist'));

		// // add toy to wishlist when button is clicked
		$scope.addToWishlist = function(toyName, toyPrice, onWishlist, toyThumbnail, toyReviewImage){
			wishlistService.addToWishlist(toyName, toyPrice, onWishlist, toyThumbnail, toyReviewImage);
		};
		
		// bind removeFromWishlist to $scope
		$scope.removeFromWishlist = function(id) {
			// wishlistService.removeFromWishlist(id);
			if(confirm('Are you sure you want to remove this toy?') === true) {
				$scope.wishlist.$remove(id);
			}
		};


}]);