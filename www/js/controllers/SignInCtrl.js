'use strict';

showcaseApp.controller('SignInCtrl', function ($scope, $location, $state, $http) {

	function init(){
		$scope.signin = {};
		$scope.signin.alert ='';
		$scope.signin.attempts = 0;

		var un = localStorage.getItem('TBUserName');
		if( un != null ){
			un = JSON.parse(un);
			$scope.signin.username = un.username;
			$scope.signin.rememberMe = un.rememberMe;
			$scope.signin.password = un.password;
		}
	}

	init();

	$scope.signIn = function(){

		if( $scope.signin.password == "showcase1014"
			&& $scope.signin.username == "phil@travelbytes.biz"){
			if( $scope.signin.rememberMe == true ){
				localStorage.setItem('TBUserName', JSON.stringify($scope.signin));
			}
			$location.path("/");
		} else {
			$scope.signin.attempts = $scope.signin.attempts+1;
			$scope.signin.alert = "Incorrect Username and Password. Please try again."
		}

	}

});