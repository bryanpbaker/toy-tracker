toyTrackerApp.directive('myToysCard', function() {

    return {
        restrict: 'E',
        templateUrl: 'partials/my-toys-card.html'
    }

});
toyTrackerApp.directive('selectOnClick', ['$window', function ($window) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.on('click', function () {
                if (!$window.getSelection().toString()) {
                    // Required for mobile Safari
                    this.setSelectionRange(0, this.value.length)
                }
            });
        }
    };
}]);
toyTrackerApp.directive('toyCard', function() {

    return {
        restrict: 'E',
        templateUrl: 'partials/toy-card.html'
    }

});
toyTrackerApp.directive('toyDetail', function() {

    return {
        restrict: 'E',
        templateUrl: 'partials/toy-detail.html'
    }

});
toyTrackerApp.directive('wishlistCard', function() {

    return {
        restrict: 'E',
        templateUrl: 'partials/wishlist-card.html'
    }

});