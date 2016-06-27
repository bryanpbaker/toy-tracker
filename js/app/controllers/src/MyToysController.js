toyTrackerApp.controller('MyToysController', ['$scope', '$firebaseArray', 'setMyToys', function($scope, $firebaseArray, setMyToys) {

		// $scope.wishlist = wishlistService.wishlist;

		var ref = new Firebase('https://toy-tracker-app.firebaseio.com/users/' + authData.uid);
		$scope.myToys = $firebaseArray(ref.child('my-toys'));



		// bind removeFromWishlist to $scope
		$scope.removeFromWishlist = function(id) {
			// wishlistService.removeFromWishlist(id);
			if(confirm('Are you sure you want to remove this toy?') === true) {
				$scope.myToys.$remove(id);
			}
		};


}]);