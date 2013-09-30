'use strict';

/**
 * WebApp Configuration of States
 */
var signin_state			= { name: 'signin', url:'/signin', templateUrl : 'views/pages/signin.html' }
var dashboard_state			= { name: 'dashboard', url:'/', templateUrl : 'views/dashboard.html' }
	var dashboardtest_state		= { name: 'dashboardtest', url:'/dashboardtest', templateUrl : 'views/pages/dashboard-test.html' }
var alerts_state			= { name: 'alerts', url:'/alerts', templateUrl : 'views/pages/alerts.html' }
var profile_state			= { name: 'profile', url:'/profile', templateUrl : 'views/pages/profile.html' }
var settings_state			= { name: 'settings', url:'/settings', templateUrl : 'views/pages/settings.html' }
var privacy_state			= { name: 'privacy', url:'/privacy', templateUrl : 'views/pages/privacy.html' }
var terms_state				= { name: 'terms', url:'/terms', templateUrl : 'views/pages/terms.html' }


/**
 * 
 */
var showcaseConfig = function($stateProvider){

	$stateProvider.state(signin_state)
	.state(dashboard_state)
	.state(dashboardtest_state)
	.state(alerts_state)
	.state(profile_state)
	.state(settings_state)
	.state(privacy_state)
	.state(terms_state)
	;

}


var showcaseApp = angular.module('showcase', [
		'ngTouch',
		'ngAnimate',
		'ui.state',
		'ui.bootstrap',
		'traveller.services',
		'travelBytes.directives',
		'mcm.services',
		'ui.bootstrap.transition'
	]
)
.config( showcaseConfig );


showcaseApp.run(function($window, $rootScope, $location, $state, MCMAlerts) {
	
	//importing the underscore.string library
	_.mixin(_.str.exports());

	//determine if the user is online or not.
	//TODO: state aware buttons
	$rootScope.online = 'offline';
	$window.addEventListener("online", function () {
			$rootScope.$apply(function() {
				$rootScope.online = true;
				MCMAlerts.init();
			});
		}, 
		false
	);
	$rootScope.online = (navigator.onLine) ? 'online' :'offline';


	$rootScope.$on('$stateChangeStart', function( event, toState ){
		// console.log('stateChangeStart for : ' + toState);
	});


	$rootScope.$on('$stateChangeSuccess', function(next, current) { 
		// console.log('stateChangeSuccess for : ' + next);
	});
	
	
	//begin application
	$state.transitionTo(signin_state);

	}
);




