toyTrackerApp.controller('UsersController', ['$scope', '$firebaseObject', 'setProfile', 'usersService', function($scope, $firebaseObject, setProfile, usersService) {

	var usersCtrl = this;
	var ref = new Firebase('https://toy-tracker-app.firebaseio.com/users/' + authData.uid );
	$scope.profile = $firebaseObject(ref.child('profile'));

	
	$scope.saveProfile = function(){
		$scope.profile.$save().then(function(response){
			alert('Your profile has been saved!');
		});
	}


}]);
