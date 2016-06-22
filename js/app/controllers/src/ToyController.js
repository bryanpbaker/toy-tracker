toyTrackerApp.controller('ToyController', ['toyService', '$scope', function(toyService, $scope) {

	$scope.toyDetail = toyService.clickedToy;

	console.log($scope.toyDetail);

}]);