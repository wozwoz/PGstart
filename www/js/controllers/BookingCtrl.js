
showcaseApp.controller('BookingCtrl', function ($scope, $location, $state, $attrs, $transition) {
    

    /** 
     * Initialise Function for the Controller and Display Variables
     */
    var initialise = function(){

		$scope.display ={};
		$scope.display.segNum = -1;
		$scope.display.show = false;

	}

	initialise();

	/*
	 * Selects a segment to display
	 */
	$scope.segmentSelect = function( idx ) {
		
		console.log( $attrs.rloc + " segment selected = "+idx+"; segment currently displayed :"+$scope.display.segNum);

		// Note : index here is the display index from 1..length of the array because of $index in ng-repeat
		if ( $scope.display.segNum != idx ){
			//set the display variables
			$scope.display.segNum = idx;
			$scope.display.show = true;
		} else {
			//display toggle - hide the current segment
			$scope.display.show = ! $scope.display.show;
		}

	}


	$scope.cardRight = function(){
		console.log("right swipe");
		//from right to left means - show the card before this one (idx-1 in the array)
		var segNum = parseInt($scope.display.segNum);
		if ( segNum > 1 ) {
			$scope.display.direction = "rightswipe";
			$scope.segmentSelect( segNum-1 );
		} else {
			// = 0 means its already the left most card so do nothing
			;
		}
	}
	$scope.cardLeft = function(){
		console.log("left swipe");
		//move one to the right - show the card to the right (idx+1 in the array)
		var segNum = parseInt($scope.display.segNum);
		if ( segNum < $scope.booking.segments.length ) {
			$scope.display.direction = "leftswipe";
			$scope.segmentSelect( segNum+1 );
		} else {
			// = 0 means its already the left most card so do nothing
			;
		}		
	}


});