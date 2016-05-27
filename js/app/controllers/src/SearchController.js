toyTrackerApp.controller('SearchController', ['$scope', '$http', function($scope, $http) {

	// set the default search term
	$scope.searchTerm = 'Action Figure';

	// walmart api public key
	$scope.publicKey = 'bd3q9g624ym5mrk9ad75ntfw';


	// loading spinner
	$scope.loading = true;
	

	function fetch(){
		$scope.loading = true;

		$http.jsonp('http://api.walmartlabs.com/v1/search?apiKey=' + $scope.publicKey + '&query=' + $scope.searchTerm + '&categoryId=4171&facets=on&facet.filter=gender:Boys&numItems=25&sort=bestseller&callback=JSON_CALLBACK')
		.then(function(response){ 
			$scope.toys = response.data.items;

			console.log(response);
		})
		.finally(function() {
			$scope.loading = false;
		});
	}

	// watch the search box and call the api
	$scope.$watch('searchTerm', function() {
		fetch();
	}); 

}]);