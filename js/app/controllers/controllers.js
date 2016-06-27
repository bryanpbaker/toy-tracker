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
toyTrackerApp.controller('ToyController', ['toyService', '$scope', function(toyService, $scope) {

	$scope.toyDetail = toyService.clickedToy;

}]);
toyTrackerApp.controller('UsersController', ['$scope', '$firebaseObject', 'setProfile', 'usersService', function($scope, $firebaseObject, setProfile, usersService) {

	var usersCtrl = this;
	var ref = new Firebase('https://toy-tracker-app.firebaseio.com/users/' + authData.uid );
	$scope.profile = $firebaseObject(ref.child('profile'));
	$scope.editMode = false;

	
	$scope.saveProfile = function(){
		$scope.profile.$save().then(function(response){
			alert('Your profile has been saved!');
		});

		$scope.editMode = false;
	}

	$scope.editProfile = function() {
		$scope.editMode = true;
	}


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