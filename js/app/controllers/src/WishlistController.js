toyTrackerApp.controller('WishlistController', ['$scope', '$firebaseArray', 'wishlistService', function($scope, $firebaseArray, wishlistService) {

		// bind firebase wishlist to $scope
		$scope.wishlist = wishlistService.wishlist;


		// bind removeFromWishlist to $scope
		$scope.removeFromWishlist = function(id) {
			wishlistService.removeFromWishlist(id);
		}


}]);