'use strict';

var tube = angular.module("tube");

tube.controller('DeviceCtrl', ['$scope', '$routeParams', 'tokenFactory', 'deviceFactory', 'servicesConfig',
  function($scope, $routeParams, tokenFactory, deviceFactory, servicesConfig){

  $scope.devices = [];

  tokenFactory.getToken.success(function(token){
    deviceFactory.devices(token.access_token).success(function(data) {
      $scope.devices = data['devices'];
    }).error(function(){
      console.log('error')
    });
  });

}]);