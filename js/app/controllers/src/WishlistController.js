toyTrackerApp.controller('WishlistController', ['$scope', '$firebaseArray', 'wishlistService', 'setWishlist', '$timeout', function($scope, $firebaseArray, wishlistService, setWishlist, $timeout) {

		// $scope.wishlist = wishlistService.wishlist;

		var ref = new Firebase('https://toy-tracker-app.firebaseio.com/users/' + authData.uid);
		$scope.wishlist = $firebaseArray(ref.child('wishlist'));
		$scope.myToys = $firebaseArray(ref.child('my-toys'));
		var MyToys = $scope.myToys;

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

		// add toy to my toys
		$scope.addToMyToys = function(toyName, toyPrice, itemId, toyThumbnail, toyReviewImage, id) {
			$scope.haveToy = true;

			MyToys.$add({
				name: toyName,
				price: toyPrice,
				itemId: itemId,
				thumbnailImage: toyThumbnail,
				reviewImage: toyReviewImage
			}).then(function() {
				$timeout(function() {
					$scope.haveToy = false;
				}, 800);
			});

			$scope.wishlist.$remove(id);
		}


}]);