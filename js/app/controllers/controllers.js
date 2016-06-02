toyTrackerApp.controller('GlobalController', ['$scope', function($scope) {

}]);
toyTrackerApp.controller('SearchController', ['$scope', '$http', 'wishlistService', function($scope, $http, wishlistService) {

	// set the default search term
	$scope.searchTerm = 'Action Figure';

	// walmart api public key
	$scope.publicKey = 'bd3q9g624ym5mrk9ad75ntfw';


	// loading spinner
	$scope.loading = true;
	

	// fetch data from the api, based on search
	function fetch(){
		$scope.loading = true;

		$http.jsonp('http://api.walmartlabs.com/v1/search?apiKey=' + $scope.publicKey + '&query=' + $scope.searchTerm + '&categoryId=4171&facets=on&facet.filter=gender:Boys&numItems=25&sort=bestseller&callback=JSON_CALLBACK')
		.then(function(response){ 
			$scope.toys = response.data.items;

			// console.log(response);
		})
		.finally(function() {
			$scope.loading = false;
		});
	}

	// watch the search box and call the api
	$scope.$watch('searchTerm', function() {
		fetch();
	}); 


	// add toy to the wishlist array
	$scope.addToWishlist = function(toyName, toyPrice, onWishlist, toyThumbnail, toyReviewImage) {
		wishlistService.addToWishlist(toyName, toyPrice, onWishlist, toyThumbnail, toyReviewImage);
	}

	// bind $scope.wishlist to wishlist from wishlistService
	$scope.wishlist = wishlistService.wishlist;

}]);

toyTrackerApp.controller('WishlistController', ['$scope', '$firebaseArray', 'wishlistService', function($scope, $firebaseArray, wishlistService) {

		$scope.wishlist = wishlistService.wishlist;


		$scope.removeFromWishlist = function(id) {
			wishlistService.removeFromWishlist(id);
		}


}]);