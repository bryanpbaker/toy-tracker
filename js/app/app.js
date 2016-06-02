var toyTrackerApp = angular.module('toyTrackerApp', ['ui.router', 'firebase']);

toyTrackerApp.config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise('/');
  //
  // Now set up the states
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'templates/home.html'
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