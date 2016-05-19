toyTrackerApp.controller('SearchController', ['$scope', '$http', function($scope, $http) {

	// set the default search term
	$scope.searchTerm = 'Batman';

	// walmart api public key
	$scope.publicKey = 'bd3q9g624ym5mrk9ad75ntfw';
	// api url
	$scope.apiAddress = 'http://api.walmartlabs.com/v1/search?apiKey=' + $scope.publicKey + '&query=ipod&categoryId=3944&callback=JSON_CALLBACK';

	
	// watch the search box and call the api
	$scope.$watch('searchTerm', function() {
		fetch();
	}); 

	function fetch(){

		$http.jsonp($scope.apiAddress)
			.then(function(response){ 

				$scope.toys = response.data.items;

				console.log($scope.toys);

			});
	}

}]);