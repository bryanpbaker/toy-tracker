toyTrackerApp.controller('WishlistController', ['$scope', '$firebaseArray', 'wishlistService', 'setWishlist', function($scope, $firebaseArray, wishlistService, setWishlist) {

		var ref = new Firebase('https://toy-tracker-app.firebaseio.com/users/' + authData.uid);
		$scope.wishlist = $firebaseArray(ref.child('wishlist'));
		
		// bind removeFromWishlist to $scope
		$scope.removeFromWishlist = function(id) {
			wishlistService.removeFromWishlist(id);
		}


}]);