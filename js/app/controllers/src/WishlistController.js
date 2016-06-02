toyTrackerApp.controller('WishlistController', ['$scope', '$firebaseArray', 'wishlistService', function($scope, $firebaseArray, wishlistService) {

		$scope.wishlist = wishlistService.wishlist;


		$scope.removeFromWishlist = function(id) {
			wishlistService.removeFromWishlist(id);
		}


}]);