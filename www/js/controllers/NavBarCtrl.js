showcaseApp.controller('NavBarCtrl', function ($scope, $location) {
    $scope.isCollapsed = true;

    $scope.signout = function() {
    	//TODO Clear UserAuth
    	$location.path("/signin");
    }

});
