var toyTrackerApp = angular.module('toyTrackerApp', ['ui.router', 'firebase']);

toyTrackerApp.config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise('/home');
  //
  // Now set up the states
  $stateProvider
    .state('login', {
      url: '/',
      templateUrl: 'templates/login.html',
      resolve: {
        requireNoAuth: function($state, authService){
          return authService.auth.$requireAuth().then(function(auth){
            $state.go('home');
          }, function(error){
            return;
          });
        }
      }
    })
    .state('register', {
      url: '/register',
      templateUrl: 'templates/register.html',
      resolve: {
        requireNoAuth: function($state, authService){
          return authService.auth.$requireAuth().then(function(auth) {
            $state.go('search');
          }, function(error){
            return;
          });
        }
      }
    })
    .state('home', {
      url: '/home',
      templateUrl: 'templates/home.html',
      resolve: {
        auth: function($state, authService){
          return authService.auth.$requireAuth().catch(function(){
            $state.go('login');
          });
        }
      }
    })
    .state('dashboard', {
      url: '/dashboard',
      templateUrl: 'templates/dashboard.html',
      controller: 'UsersController',
      resolve: {
        auth: function($state, authService){
          return authService.auth.$requireAuth().catch(function(){
            $state.go('login');
          });
        },
        setProfile: function(authService){
          return authData = authService.auth.$getAuth();
        }
      }
    })
    .state('search', {
      url: '/search',
      templateUrl: 'templates/search.html',
      resolve: {
        auth: function($state, authService){
          return authService.auth.$requireAuth().catch(function(){
            $state.go('login');
          });
        },
        setWishlist: function(authService, wishlistService){
          return authData = authService.auth.$getAuth();
          console.log(authData);
        }
      }
    })
    .state('toyDetail', {
      url: '/toy/:id',
      templateUrl: 'partials/toy.html',
      // controller: 'ToyController as toyCtrl'
    })
    .state('wishlist', {
      url: '/wishlist',
      templateUrl: 'templates/wishlist.html',
      controller: 'WishlistController',
      resolve: {
        auth: function($state, authService){
          return authService.auth.$requireAuth().catch(function(){
            $state.go('login');
          });
        },
        setWishlist: function(authService, wishlistService){
          return authData = authService.auth.$getAuth();
        }
      }
    })
    .state('my-toys', {
      url: '/my-toys',
      templateUrl: 'templates/myToys.html',
      controller: 'MyToysController',
      resolve: {
        auth: function($state, authService){
          return authService.auth.$requireAuth().catch(function(){
            $state.go('login');
          });
        },
        setMyToys: function(authService, wishlistService){
          return authData = authService.auth.$getAuth();
        }
      }
    })
    
});

toyTrackerApp.constant('FirebaseUrl', 'https://toy-tracker-app.firebaseio.com/');