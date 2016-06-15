toyTrackerApp.controller('AuthController', ['$scope', '$state', 'authService', 'usersService',  function($scope, $state, authService, usersService) {

	var authCtrl = this;

	authCtrl.user = {
		email: '',
		password: ''
	};

	authCtrl.login = function() {
		authService.auth.$authWithPassword(authCtrl.user).then(function(auth) {
			$state.go('search');
		}, function(error) {
			authCtrl.error = error;
		});
	};


	

}]);



// $scope.auth = authService.auth;
// $scope.authData = 'no auth data';

// $scope.email = '';

// $scope.login = function(email, password) {
// 	authService.login(email, password);
// }

// $scope.auth.$onAuth(function(authData) {
// 	$scope.authData = authData;
// });

// console.log($scope.auth);
toyTrackerApp.controller('DashboardController', ['$state', 'auth', function($state, auth) {

	var dashboardCtrl = this;



}]);

toyTrackerApp.controller('NavController', ['$scope', '$state', 'authService', function($scope, $state, authService) {

	$scope.logout = function() {
		authService.auth.$unauth();

		$state.go('login');
	}

}]);
toyTrackerApp.controller('RegisterController', ['$scope', '$state', 'authService', 'usersService', function($scope, $state, authService, usersService) {

	var regCtrl = this;

	regCtrl.user = {
		name: '',
		age: '',
		email: '',
		password: ''
	};

	// bind to users in db 
	regCtrl.users = usersService.users;

	// login registered user
	regCtrl.login = function() {
		authService.auth.$authWithPassword(regCtrl.user).then(function(auth) {
			$state.go('search');
		}, function(error) {
			regCtrl.error = error;
		});
	};

	// run login function from usersController
	regCtrl.createProfile = function(uid, name, age, email) {
		usersService.createProfile(uid, name, age, email);
	}


	// register new user
	regCtrl.register = function(name, age, email) {
		authService.auth.$createUser({
			email: regCtrl.user.email, 
			password: regCtrl.user.password

		}).then(function(user) {
			regCtrl.login();
			regCtrl.createProfile(user.uid, name, age, email);

		}, function(error) {
			regCtrl.error = error;
		});
	};


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

		// bind firebase wishlist to $scope
		$scope.wishlist = wishlistService.wishlist;


		// bind removeFromWishlist to $scope
		$scope.removeFromWishlist = function(id) {
			wishlistService.removeFromWishlist(id);
		}


}]);