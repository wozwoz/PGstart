angular
.module('travelBytes.directives', [])
.directive('contentItem', function ($compile, $http, $templateCache) {

    var mapDisplayValues = function( ctnt ){
        var tmp_str = "detault";
        if ( _.has(ctnt, "Airline") ) {
            var airline = (ctnt.Airline).split(/\s+/g); //make array
            var camel = '';
            _.each(airline, function(astr){
                camel = camel + ("-"+astr);
            });
            tmp_str = camel
        }
        //set the logo property
        ctnt.logo = "logo"+tmp_str;
    }

    var getTemplate = function(segType) {
        
        var templateLoader,
            baseUrl = 'views/segments/',
            templateMap = {
                air     : 'air.html',
                hotel   : 'hotel.html',
                car     : 'car.html',
                rail    : 'rail.html'
            };

        var templateUrl = baseUrl + "air.html"
        if ( templateMap[segType] ) {
            templateUrl = baseUrl + templateMap[segType];
        } 
        templateLoader = $http.get(templateUrl, {cache: $templateCache});
        
        return templateLoader;

    }

    var linker = function(scope, element, attrs) {

        mapDisplayValues(scope.content);

        var loader = getTemplate(scope.content.meta.segTemplate);

        var promise = loader.success(function(html) {
            element.html(html);
        }).then(function (response) {
            element.replaceWith($compile(element.html())(scope));
        });

    }

    return {
        restrict: "E",
        rep1ace: true,
        link: linker,
        scope: {
            content:'='
        }
    };
})
.directive('alertItem', function ($compile, $http, $templateCache) {


    var addDisplayFields = function(content) {

        //first create a usable date display        
        var dt = "";
        if( content.ReceiveddatetimeDisplay != "" ) {
            dt = moment(content.Receiveddatetime).format("HH:MM, DD MMM YY");
        }
        content.displayRxDateTime = dt;

        //cycle over the data elements (Data1..Data5) and enrich content
        // starts with http: => dtype = link
        // starts with tel: => callable telephone number, dtype = tel
        // starts with add => address for google maps, dtype = loc
        // default dtype = data;
        content.displayData = [];
        var fields = [];
        fields.push(content.Data1);
        fields.push(content.Data2);
        fields.push(content.Data3);
        fields.push(content.Data4);
        fields.push(content.Data5);
        
        var upds = [];
        upds.push(content.Updstatus1);
        upds.push(content.Updstatus2);
        upds.push(content.Updstatus3);
        upds.push(content.Updstatus4);
        upds.push(content.Updstatus5);

        for( var i = 0; i < fields.length; i++ ) {
            
            var d = fields[i];
            var tmp = {};
            tmp.data = d;
            tmp.Updstatus = upds[i];

            var val = "data"; //default
            if( d.toLowerCase().indexOf("tel:") >= 0 ){
                val = "tel";
            } else if( d.toLowerCase().indexOf("http://") >= 0 ) {
                val = "link";
            } else if( d.toLowerCase().indexOf(" add") >= 0 ) {
                val = "loc";
                //TODO: ? no instructions given on how to find the address from MCM - need to get test data?
            }

            tmp.dtype = val; 
            content.displayData.push(tmp);
        }

    }

    var getTemplate = function( alertType ) {

        var defaultTemplate = "info.html"
        
        var templateLoader,
            baseUrl = 'views/alerts/',
            templateMap = {
                0     : 'info.html',
                5     : 'feedback.html'
            };

        //set the default
        var templateUrl = baseUrl + defaultTemplate;

        //overwrite the default if a template is found
        if ( templateMap[ alertType ] ) {

            templateUrl = baseUrl + templateMap[ alertType ];

        }

        //get the template and load into cache - in prepartion
        templateLoader = $http.get(templateUrl, {cache: $templateCache});
        
        return templateLoader;

    }

    var linker = function(scope, element, attrs) {

        // map the Message type to partial html template
        addDisplayFields(scope.content);

        var templateLoader = getTemplate(scope.content.Messagetype);

        // create a promise to load the template and if successful then compile and inject it
        var promise = templateLoader.success(function(html) {
            
            element.html(html);

        }).then(function (response) {
            
            element.replaceWith($compile(element.html())(scope));

        });

    }

    return {
        restrict: "E",
        replace: true,
        link: linker,
        scope: {
            content:'='
        },
        controller: function($scope, MCMAlerts){
            $scope.sendFeedbackResponse = function( idx ) {

                var pkt = {};
                pkt.data1 = this.obj.data;
                pkt.Updstatus1 = this.obj.Updstatus;
                pkt.Messagetype = this.$parent.content.Messagetype;
                pkt.MobileclientID = this.$parent.content.MobileclientID;
                pkt.ChannelID = this.$parent.content.ChannelID;
                pkt.MessagesequenceID = this.$parent.content.MessagesequenceID;
                pkt.ExternalID = this.$parent.content.ExternalID;

                MCMAlerts.sendResponse(pkt);

            }            
        }
    };
});

