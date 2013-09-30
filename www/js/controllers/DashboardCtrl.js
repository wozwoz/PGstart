'use strict';


showcaseApp.controller('DashboardCtrl', function ($scope, $location, $state, $http, $transition, MCM, BookingDetail) {

	var segmentToTemplateMap = {
		'FlightInformation'	: 'air',
		'HotelInformation' 	: 'hotel',
		'CarInformation' 	: 'car',
		'RailInformation' 	: 'rail',
		'OtherInformation' 	: 'other',
		'InsuranceInformation' : 'insurance',
		'SeaInformation' 	: 'sea'
	}
	var segmentToIconMap = {
		'FlightInformation'	: 'plane',
		'HotelInformation' 	: 'lodging',
		'CarInformation' 	: 'car',
		'RailInformation' 	: 'train',
		'OtherInformation' 	: 'stopsign',
		'InsuranceInformation' : 'stopsign',
		'SeaInformation' 	: 'stopsign'
	}

	var initialise = function() {

		$scope.myBookingsList = [];
		$scope.bookings = [];

		//load the bookingSummary into a myBookingsList
		BookingDetail.load( function( data ){

			$scope.myBookingsList = data; //array

			// iterate the myBookingsList and get full detail to display
			_.each($scope.myBookingsList, function(booking) {

				// load the data for each booking
				BookingDetail.get({rloc: booking.rloc}, function(rdata) {
					//objective is to:
					// 1. build by segment icons, grouped by Date
					// 2. put segments in segmentNumber order into a simple array

					var bookingDisplayObj = {};
					bookingDisplayObj.title = booking.tripTitle;
					bookingDisplayObj.rloc = booking.rloc;
					bookingDisplayObj.segmentDateGroups = [];
					bookingDisplayObj.segments = [];

					//TravelDetails is already grouped into dates, with its segments as siblings to the Date property
					_.each(rdata.tbstruct.tbdoc.TravelDetails.Date, function(obj){
						
						var dateGroup = {}
						dateGroup.title = moment(obj.Date).format("DD MMM");
						dateGroup.segments = [];

						var dateGroupKeys = _.keys(obj);
						_.each( dateGroupKeys, function( mykey ) {
							var myobj = obj[mykey];
							//ignore properties which are not segments - e.g. Date
							if( _.isObject(myobj) && _.has(myobj,"SegmentNumber") ) {
								//add the meta information for its icon
								var meta = {}; //summary info used for icon tray
								meta.segTemplate = segmentToTemplateMap[mykey];
								meta.segIcon = segmentToIconMap[mykey];
								meta.dateGroupDate = dateGroup.title;
								meta.segNum = myobj.SegmentNumber;
								myobj.meta = meta; //add to segment detail
								dateGroup.segments.push(meta); //add meta summary to segments for dateGroup
								bookingDisplayObj.segments.push(myobj);  //add detail object to segments 
							}
						});
						//TODO: sort date segments to ensure they are in order 
						//they should be from the itinerary structure anyways, but JSON convertion might not guarentee obj property order.
						bookingDisplayObj.segmentDateGroups.push(dateGroup);
					});

					//set the travel startDate for the display title bar
					bookingDisplayObj.startDate = "";
					if (bookingDisplayObj.segmentDateGroups.length >0) {
						bookingDisplayObj.startDate = (bookingDisplayObj.segmentDateGroups[0]).title;
					}

					//finally add the bookingDisplayObj to the bookings array
					$scope.bookings.push(bookingDisplayObj);

				});

			});

		});

		var myScroll;
		function loaded() {
			setTimeout(function() {
				_.each($scope.myBookingsList, function(booking) {
					myScroll = new iScroll('iscroll-iconbar-wrapper-' + booking.rloc);
				})
			}, 100);
		}
		window.addEventListener('load', loaded, false);

	}

	initialise();

});