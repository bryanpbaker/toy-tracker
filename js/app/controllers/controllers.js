toyTrackerApp.controller('AuthController', ['$scope', '$state', 'authService', 'usersService', 'wishlistService',  function($scope, $state, authService, usersService, wishlistService) {

	var authCtrl = this;

	authCtrl.user = {
		email: '',
		password: ''
	};

	authCtrl.login = function() {
		authService.auth.$authWithPassword(authCtrl.user).then(function(auth) {
			$state.go('home');

			authCtrl.userData = auth;
			authCtrl.uid = authCtrl.userData.uid;
			
			// get correct wishlist
			// wishlistService.getWishlist(authCtrl.uid);

		}, function(error) {
			authCtrl.error = error;
		});
	};

}]);


toyTrackerApp.controller('DashboardController', ['$state', function($state) {

	var dashboardCtrl = this;



}]);

toyTrackerApp.controller('NavController', ['$scope', '$state', 'authService', 'wishlistService', function($scope, $state, authService, wishlistService) {

	$scope.logout = function() {
		authService.auth.$unauth();
		$state.go('login');
	}

	authService.auth.$onAuth(function(authData){
		if(authData){
			$scope.loggedIn = true;
		} else{
			$scope.loggedIn = false;
		}
	});

}]);
toyTrackerApp.controller('RegisterController', ['$scope', '$state', 'authService', 'usersService', 'wishlistService', function($scope, $state, authService, usersService, wishlistService) {

	var regCtrl = this;

	// bind to users in db 
	regCtrl.users = usersService.users;

	// login registered user
	regCtrl.login = function() {
		authService.auth.$authWithPassword(regCtrl.user).then(function(auth) {
			regCtrl.userData = auth;
			regCtrl.uid = regCtrl.userData.uid;

			// get wishlist
			wishlistService.uid = regCtrl.uid;

			// Go to the home page
			$state.go('home');

			// user is logged in
			authService.loggedIn = true;
			
		}, function(error) {
			regCtrl.error = error;
		});
	};


	// register new user
	regCtrl.register = function(uid, fullName, age, email, password) {
		authService.auth.$createUser({
			email: regCtrl.user.email, 
			password: regCtrl.user.password

		}).then(function(user) {
			regCtrl.login();
			usersService.createProfile(user.uid, fullName, age, email, password);
			
			// wishlistService.getWishlist(user.uid);

		}, function(error) {
			regCtrl.error = error;
		});
	};


}]);

toyTrackerApp.controller('SearchController', ['$scope', '$http', 'wishlistService', '$firebaseArray', '$timeout', function($scope, $http, wishlistService, $firebaseArray, $timeout) {

	var ref = new Firebase('https://toy-tracker-app.firebaseio.com/users/' + authData.uid);
	$scope.wishlist = $firebaseArray(ref.child('wishlist'));

	var Wishlist = $scope.wishlist;


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
		$scope.addingToy = true;

		Wishlist.$add({
			name: toyName,
			price: toyPrice,
			onWishlist: onWishlist,
			thumbnailImage: toyThumbnail,
			reviewImage: toyReviewImage
		}).then(function() {
			$timeout(function(){
				$scope.addingToy = false;
			}, 800);
		});
	}

	// bind $scope.wishlist to wishlist from wishlistService

}]);
toyTrackerApp.controller('WishlistController', ['$scope', '$firebaseArray', 'wishlistService', 'setWishlist', function($scope, $firebaseArray, wishlistService, setWishlist) {

		// $scope.wishlist = wishlistService.wishlist;

		var ref = new Firebase('https://toy-tracker-app.firebaseio.com/users/' + authData.uid);
		$scope.wishlist = $firebaseArray(ref.child('wishlist'));

		// // add toy to wishlist when button is clicked
		$scope.addToWishlist = function(toyName, toyPrice, onWishlist, toyThumbnail, toyReviewImage){
			wishlistService.addToWishlist(toyName, toyPrice, onWishlist, toyThumbnail, toyReviewImage);
		};
		
		// bind removeFromWishlist to $scope
		$scope.removeFromWishlist = function(id) {
			// wishlistService.removeFromWishlist(id);
			if(confirm('Are you sure you want to remove this toy?') === true) {
				$scope.wishlist.$remove(id);
			}
		};


}]);