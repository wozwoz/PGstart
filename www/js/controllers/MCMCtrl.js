'use strict';

showcaseApp.controller('MCMCtrl', function ($scope, $location, $state, $rootScope, MCMAlerts ) {

	$scope.now = new Date();
	$scope.MCMAlerts = [];


	var init = function() {

		//init will signin and also sync messages with the 
		var stored_alerts = MCMAlerts.get();
		if( stored_alerts != null) {
			$scope.MCMAlerts = stored_alerts;
		}
		
		//TODO: if online then initalise the service
		if( $rootScope.online == 'online'){
			MCMAlerts.init();
		}

	}

	$scope.refreshMessages = function() {

		$scope.MCMAlerts = MCMAlerts.get();

	}

	$scope.clicked = function( idx ) {
		console.log("message click for item number : ", idx);
	}

	//get a valid connection
	init();

});