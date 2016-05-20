toyTrackerApp.controller('SearchController', ['$scope', '$http', function($scope, $http) {

	// set the default search term
	$scope.searchTerm = 'Action Figure';

	// walmart api public key
	$scope.publicKey = 'bd3q9g624ym5mrk9ad75ntfw';
	

	function fetch(){

		$http.jsonp('http://api.walmartlabs.com/v1/search?apiKey=' + $scope.publicKey + '&query=' + $scope.searchTerm + '&categoryId=4171_4172_1156794&numItems=25&sort=bestseller&callback=JSON_CALLBACK')
		.then(function(response){ 
			$scope.toys = response.data.items;

			console.log($scope.toys);
		});
	}

	// watch the search box and call the api
	$scope.$watch('searchTerm', function() {
		fetch();
	}); 

}]);