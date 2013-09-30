var services = angular.module('mcm.services',[
	'ngResource'
]);



/**
 * MCM Service is for the Mobile Charter Messages
 * This service is handled via server side proxy in GAE, as MCM doesn't cater for direct JSONP.
 * The proxy does JSON pass through request and responses, and clients uses JSONP to same domain proxy.
 */
services.factory('MCMAlerts', function ($http) {

	var serviceKeys = {};
	var commsStatus = {};

	function init(){

		commsStatus.state = "idle";
		signin();

	}
	

	/**
	 * Init function sign's in to the MCM service.
	 */
	function signin() {

		//ensure commsStatus.state is 
		if ( !(commsStatus.state == "signin" || commsStatus.state == "idle") ) {
			//log error
			console.log("MCM init called while in different state")
			return -1;
		}

		if( serviceKeys.loggedIn ){
			console.log("MCM login current");
			return 1;
		}

		//build signin json packet 
		var pkt = {};
		pkt.Password = "funword";
		pkt.Email = "phil@travelbytes.biz";

		//use proxy service in GAE to get to MCM service with signin request
		// $http({
		// 	method: 'POST',
		// 	url: 'http://localhost:14080/proxy?url=http://amexctntest.chartersi.com:7011/IMSMobileClientService.svc/LoginMobileClientV2',
		// 	contentType: 'application/json',
		// 	data: pkt
		// 	})
		$http({
			method: 'POST',
			url: 'data/mcm-login-rsp.json',
			contentType: 'application/json',
			data: pkt
			})
		.success( function( data, status, headers, config){
			
			// Was the signin request a FAIL?
			if (data.ResponseCode != 0 && data.Success != true) {
				//Handle Fail
				//TODO: MCM Credential Fail : need to setup workflow
				// ? present the user with a message ?
				//TODO: Client Log File
				console.log("MCM signin error");
				console.log(data);
			}
			
			//Signin Successful Response from MCM
			console.log("MCM Signin successful");

			//set the service keys and commsStatus
			serviceKeys.MobileclientID = data.MobileclientID;
			serviceKeys.Phonenumber = data.Phonenumber;
			serviceKeys.loggedIn = true;
			setServiceKeys(serviceKeys);

			commsStatus.loggedIn = serviceKeys.loggedIn;
			commsStatus.state = "idle";
			//TODO : log the client successful login to MCM.

			sync();
			
		})
		.error( function(data, status) {
			
			//TODO: MCM Service Error - need workflow to handle??
			console.log("MCM Signin fail - error with http call");

		});
	}

	/**
	 * This function manages the retireval and acknowledgment of the current Message list from the MCM Server.
	 * @desc Pull Messages from API. If the message is recieved, then need to send an acknowledgement, 
	 * and get the response to ack.  If the send ack occurs 3 times without successful response, then need to
	 * retry the Pull Messages from API.  If this routing fails 3 times, then an error is reported.
	 */
	function sync(){

		//ensure commsStatus.state is idle and trying to sync
		if ( !(commsStatus.state == "sync" || commsStatus.state == "idle" )) {
			//log error
			console.log("MCM sync called while in different state");
			return -1;
		}

		//build json packet to request the current Message List from Server
		var pkt = {};
		pkt.MobileclientID = serviceKeys.MobileclientID;


		//get tzs from api call
		// $http({
		// 	method: 'POST',
		// 	url: 'http://localhost:14080/proxy?url=http://amexctntest.chartersi.com:7011/IMSMobileClientService.svc/PullOutboundMessages',
		// 	contentType: 'application/jsonp',
		// 	data: pkt
		// 	})
		$http({
			method: 'POST',
			url: 'data/mcm-getMessages-rsp.json',
			contentType: 'application/jsonp',
			data: pkt
			})
		.success( function( data, status, headers, config){
			
			// Was the request a FAIL?
			if (data.Success != true) {
				//Handle Fail
				//TODO: MCM Credential Fail : need to setup workflow
				// ? present the user with a message ?
				//TODO: Client Log File
				console.log("MCM Pull Messages error");
				console.log(data);
			}
			
			//Pull Message Successful Response from MCM			
			console.log("MCM sync Successful");

			serviceKeys.msgs = data;

			//need to handshake the pull request - acknowledge the message delivery, wait on confirm of the acknowledge response
			commsStatus.state = "idle";

			set(data);

			
		})
		.error( function(data, status) {
			
			console.log("MCM sync - Pull Messages Request Fail");

		});

		
	}

	/** Get MCMAlerts
	 * @desc Get the localStorage object to the current array
	 * @param data - array of MCM Messages 
	 */
	function get() {
		var rval = null;
		var tmp = localStorage.getItem('MCMAlerts');
		
		if( tmp ) {
			rval = JSON.parse(tmp);
		} else {
			rval = null;
		}

		return rval;
	}

	/**  Set MCMAlerts
	 * @desc Set the localStorage object to the current array
	 * @param data - array of MCM Messages 
	 */
	function set(data) {
		localStorage.setItem('MCMAlerts', JSON.stringify(data));
	}

	/** Get MCM ServiceKeys
	 * @desc Get the localStorage value for the MCM Service Keys
	 * @return obj
	 */
	function getServiceKeys() {
		var rval = null;
		var tmp = localStorage.getItem('MCMServiceKeys');
		
		if( tmp ) {
			rval = JSON.parse(tmp);
		} else {
			rval = null;
		}

		return rval;
	}

	/**  Set MCM Service Keys
	 * @desc Set the localStorage object for sending responses to MCM
	 * @param data - obj with Phonenumber and MobileclientID
	 */
	function setServiceKeys(data) {
		localStorage.setItem('MCMServiceKeys', JSON.stringify(data));		
	}


	/** Send a Feedback Response from the client to the Server
	 *
	 */
	 function sendResponse(pkt){

	 	console.log(pkt);

	 	var sendkeys = getServiceKeys();
	 	if( sendkeys == null ){
	 		//TODO: error
	 		return;
	 	}

		pkt.Phonenumber = sendkeys.Phonenumber;
		pkt.MobileclientID = sendkeys.MobileclientID;

	 }

	return {
		init : init,
		sync : sync,
		get : get,
		set : set,
		getServiceKeys : getServiceKeys,
		setServiceKeys : setServiceKeys,
		sendResponse : sendResponse
	}

});
