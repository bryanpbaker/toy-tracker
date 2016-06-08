var toyTrackerApp = angular.module('toyTrackerApp', ['ui.router', 'firebase']);

toyTrackerApp.config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise('/');
  //
  // Now set up the states
  $stateProvider
    .state('login', {
      url: '/',
      templateUrl: 'templates/login.html',
      resolve: {
        requireNoAuth: function($state, authService){
          return authService.auth.$requireAuth().then(function(auth){
            $state.go('search');
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
    .state('dashboard', {
      url: '/dashboard',
      templateUrl: 'templates/dashboard.html',
      resolve: {
        auth: function($state, usersFactory, authService){
          return authService.auth.$requireAuth().catch(function(){
            $state.go('login');
          });
        },
        profile: function(usersFactory, authService){
          return authService.auth.$requireAuth().then(function(auth){
            return usersFactory.getProfile(auth.uid).$loaded();
          });
        }
      }
    })
    .state('search', {
      url: '/search',
      templateUrl: 'templates/search.html'
    })
    .state('wishlist', {
      url: '/wishlist',
      templateUrl: 'templates/wishlist.html'
    });
});

toyTrackerApp.constant('FirebaseUrl', 'https://toy-tracker-app.firebaseio.com');