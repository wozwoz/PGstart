var services = angular.module('traveller.services',[
	'ngResource'
]);



/**
 * BookingSummary Service 

 .synopsis 
 This service caches in LocalStorage the current BookingSummary from the API.  
 It also refreshes the data to keep display in sync with server data.

 Currently this is running from local data file

 */
services.factory('BookingSummary', function($http) {
	return $http.get('data/BookingSummary.json');
});


services.factory('BookingDetail', ['$resource',
	function($resource) {
		return $resource('data/:rloc.json', {}, {
			load: {method:'GET', params:{rloc:'bookingSummary'}, isArray:true}
		});
	}
]);


/**
 * MCM Service is for the Mobile Charter Messages
 */
services.service('MCM', function ($http) {
    var init = function() {

    	var pkt = {};
    	pkt.Password = "funword";
    	pkt.Email = "phil@travelbytes.biz";

        //get tzs from api call
        $http({
            method: 'GET',
            url: 'http://amexctntest.chartersi.com:7011/IMSMobileClientService.svc/LoginMobileClientV2',
            contentType: 'application/jsonp',
            data: pkt
            })
        .success( function( data, status, headers, config){
            
            console.log(data);
            
        })
        .error( function(data, status) {
            
            console.log("error with MCM init");

        });
    }

    var get = function( key ){
    	console.log("get")
    }

    return {
        init : init,
        get : get
    }

});
