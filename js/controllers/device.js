'use strict';

var tube = angular.module("tube");

tube.controller('DeviceCtrl', ['$scope', '$location', 'tokenFactory', 'deviceFactory', 'servicesConfig',
  function($scope, $location, tokenFactory, deviceFactory, servicesConfig){

  $scope.devices = [];

  console.log('/devices');

  var accessToken = tokenFactory.getAccessToken();

  console.log(accessToken);

  if (!accessToken) {
    $location.path("/");
  }else{
    deviceFactory.devices(accessToken).success(function(data) {
      $scope.devices = data['devices'];
    }).error(function(){
      console.log('error')
    });
  }

}]);