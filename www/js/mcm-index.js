'use strict';

/**
 * WebApp Configuration of States
 */
var init_state         = { name: 'test', url:'/', templateUrl : 'views/mcm.html' }


/**
 * 
 */
var showcaseConfig = function($stateProvider, $routeProvider){

    $stateProvider.state(init_state)
    ;
    
}


var showcaseApp = angular.module('showcase', [
        'ui.state',
        'mcm.services',
		'travelBytes.directives'
    ]
)
.config( showcaseConfig );


showcaseApp.run(function($window, $rootScope, $location, $state) {
    
    //begin application
    $state.transitionTo(init_state);

    }
);




