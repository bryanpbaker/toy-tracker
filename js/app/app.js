var toyTrackerApp = angular.module('toyTrackerApp', ['ui.router']);

toyTrackerApp.config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/");
  //
  // Now set up the states
  $stateProvider
    .state('home', {
      url: "/",
      templateUrl: "templates/home.html"
    })
    .state('about', {
      url: "/about",
      template: '<div class="home"><h2>Hello About View!</h2><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos eaque ullam provident quod ipsa molestias, ab odit sapiente eum ipsum esse quo nobis eveniet nihil accusamus aperiam totam libero nemo voluptates suscipit atque porro error mollitia alias. Adipisci blanditiis excepturi officiis tenetur quisquam totam nulla, optio quod amet fugit magnam possimus voluptatum, quae aliquid necessitatibus quibusdam quos sequi culpa beatae exercitationem corporis? Error voluptatibus nihil ab facilis, earum minima asperiores repellendus porro, ex fugiat odit assumenda esse debitis officiis reiciendis dolore nostrum cupiditate suscipit. Est ipsa eligendi, ad accusantium error quae dolorum accusamus voluptate eaque nulla, qui quia dolorem asperiores!</p></div>'
    });
});
