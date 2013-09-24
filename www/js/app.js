var myApp = angular.module('myApp', ['ui.bootstrap']);


function NavBarCtrl($scope) {
    $scope.isCollapsed = true;
}

var ModalDemoCtrl = function ($scope, $modal) {

  $scope.open = function () {

    var modalInstance = $modal.open({
      templateUrl: 'myModalContent.html',
      controller: ModalInstanceCtrl,
      resolve: {
      }
    });
  };
};

var ModalInstanceCtrl = function ($scope, $modalInstance) {
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
};


var ModalDemoCtrl2 = function ($scope, $modal) {

  $scope.open = function () {

    var modalInstance = $modal.open({
      templateUrl: 'myModalContent2.html',
      controller: ModalInstanceCtrl,
      resolve: {
      }
    });
  };
};

var ModalInstanceCtrl = function ($scope, $modalInstance) {
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
};



var ModalDemoCtrl3 = function ($scope, $modal) {

  $scope.open = function () {

    var modalInstance = $modal.open({
      templateUrl: 'myModalContent3.html',
      controller: ModalInstanceCtrl,
      resolve: {
      }
    });
  };
};

var ModalInstanceCtrl = function ($scope, $modalInstance) {
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
};


