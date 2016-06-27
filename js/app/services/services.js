toyTrackerApp.service('authService', ['$firebaseAuth', function($firebaseAuth) {

	var ref = new Firebase('https://toy-tracker-app.firebaseio.com');
	this.auth = $firebaseAuth(ref);

}]);

toyTrackerApp.factory('Search', function() {

	
	
});
toyTrackerApp.service('toyService', [function() {


}]);

toyTrackerApp.service('usersService', ['$firebaseArray', 'FirebaseUrl', '$firebaseObject', function($firebaseArray, FirebaseUrl, $firebaseObject) {

	// add new user to users in db
	this.createProfile = function(uid, name, age, email, password) {
		this.usersRef = new Firebase(FirebaseUrl + 'users/' + uid);
		this.users = $firebaseArray(this.usersRef);
		this.users.$add();

		var ref = new Firebase('https://toy-tracker-app.firebaseio.com/users/' + uid );
		this.profile = $firebaseObject(ref.child('profile'));

		this.profile.name = name,
		this.profile.age = age,
		this.profile.email = email
		this.profile.$save();
	};

}]);
toyTrackerApp.service('wishlistService', ['$firebaseArray', 'authService', '$state', function($firebaseArray, authService, $state) {

	var wishlistService = this;

	// wishlistService.currentUser = authService.auth.$getAuth();
	

	// var ref = new Firebase('https://toy-tracker-app.firebaseio.com/users/' + wishlistService.currentUser.uid);
	// wishlistService.wishlist = $firebaseArray(ref.child('wishlist'));
	


	// // add toy to wishlist when button is clicked
	// this.addToWishlist = function(toyName, toyPrice, onWishlist, toyThumbnail, toyReviewImage) {

	// 	// this.addingToy = true;

	// 	wishlistService.wishlist.$add({
	// 		name: toyName,
	// 		price: toyPrice,
	// 		onWishlist: onWishlist,
	// 		thumbnailImage: toyThumbnail,
	// 		reviewImage: toyReviewImage
	// 	}).then(function() {
	// 		// this.addingToy = false;
	// 	});
	// };


	// remove toy to wishlist when button is clicked
	// this.removeFromWishlist = function(id){
	// 	this.wishlist.$remove(id);
	// }

}]);