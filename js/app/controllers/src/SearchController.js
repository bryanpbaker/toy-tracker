toyTrackerApp.controller('SearchController', ['$scope', '$http', 'wishlistService', '$firebaseArray', '$timeout', function($scope, $http, wishlistService, $firebaseArray, $timeout) {

	var ref = new Firebase('https://toy-tracker-app.firebaseio.com/users/' + authData.uid);
	$scope.wishlist = $firebaseArray(ref.child('wishlist'));
	var Wishlist = $scope.wishlist;
	$scope.myToys = $firebaseArray(ref.child('my-toys'));
	var MyToys = $scope.myToys;


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




	// add toy to wishlist
	$scope.addToWishlist = function(toyName, toyPrice, itemId, toyThumbnail, toyReviewImage) {
		$scope.addingToy = true;

		Wishlist.$add({
			name: toyName,
			price: toyPrice,
			itemId: itemId,
			thumbnailImage: toyThumbnail,
			reviewImage: toyReviewImage
		}).then(function() {
			$timeout(function(){
				$scope.addingToy = false;
			}, 800);
		});
	}



	// Detail view functionality

	// $scope.showModal = false;
	$scope.detailView = function(clickedToy){
		// console.log(clickedToy.$id);
		$scope.toyDetail = clickedToy
		// set featured image
		$scope.featImage = $scope.toyDetail.largeImage;
		$scope.showModal = true;

		console.log(clickedToy);
	}

	$scope.closeDetailView = function(){
		$scope.showModal = false;
	}

	$scope.showImage = function(clickedThumbnail){
		$scope.featImage = clickedThumbnail.largeImage;
	}


	// add toy to my toys
	$scope.addToMyToys = function(toyName, toyPrice, itemId, toyThumbnail, toyReviewImage) {
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
	}


}]);