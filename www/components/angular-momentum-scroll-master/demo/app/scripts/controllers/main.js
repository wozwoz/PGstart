'use strict';

angular.module('demoApp')
  .controller('MainCtrl', function ($scope, $log) {
    $scope.currX = 0;
    $scope.currY = 0;
    $scope.currPageX = 0;
    $scope.currPageY = 0;
    $scope.isMaxY = false;
    $scope.isMinY = false;
    $scope.awesomeThings = [
      'scroll me down',
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma',
      'iScroll',
      'momentum',
      'Demo',
      'Github',
      'HTML5',
      'Javascript',
      '-- and again --',
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma',
      'iScroll',
      'momentum',
      'Demo',
      'Github',
      'HTML5',
      'Javascript',
      '-- and again --',
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma',
      'iScroll',
      'momentum',
      'Demo',
      'Github',
      'HTML5',
      'Javascript',
      '-- and again --',
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma',
      'iScroll',
      'momentum',
      'Demo',
      'Github',
      'HTML5',
      'Javascript'
    ];
    // setup the logger
    $scope.logger = [];
    $scope.log = function (msg) {
      var _msg = Date.now() + ' : ' + msg;
      $scope.logger.splice(0, 0, _msg);
      $log.log(_msg);
    };
    $scope.logcallback = function(pageX, pageY, X, Y) {
      $scope.log('From callback: pageX ' + pageX + ' pageY ' + pageY +
          ' X ' + X, ' Y ' + Y);
    };
    $scope.$watch('currPageY', function() {
      $scope.log('From scope: pageX ' + $scope.currPageX + ' pageY ' +
          $scope.currPageY);
    });
    $scope.$watch('currY', function() {
      $scope.log('From scope: X ' + $scope.currX + ' Y ' +
          $scope.currY );
    });

    $scope.$watch('isMinY', function() {
      if ($scope.isMinY) {
        $scope.log('MinY is reached');
      }
    });
    $scope.$watch('isMaxY', function() {
      if ($scope.isMaxY) {
        $scope.log('MaxY is reached');
      }
    });
    // scope methods
    $scope.scrollToPage = function(page) {
      $scope.currPageY = page;
    };
    $scope.append = function(item) {
      $scope.log('pushing ' + item + ' to back of the list of awesome things');
      $scope.awesomeThings.push(item);
    };
    $scope.prepend = function(item) {
      $scope.log('pushing ' + item + ' to front of the list of awesome things');
      $scope.awesomeThings.splice(0, 0, item);
    };
  });
