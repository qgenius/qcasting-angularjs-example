'use strict';

var tube = angular.module("tube");

tube.controller('DeviceDetailCtrl', ['$scope', '$filter', 'tokenFactory', 'deviceFactory', 'servicesConfig',
  function($scope, $filter, tokenFactory, deviceFactory, servicesConfig){

  $scope.devices = [];

  // tokenFactory.getToken.success(function(token){
  //   deviceFactory.devices(token.access_token).success(function(data) {

  //     var devices = data['devices'];

  //     for (var i in devices) {

  //       var udid = devices[i];

  //       deviceFactory.info(udid, token.access_token).success(function(data) {

  //         var device = data;
  //             device['udid'] = udid;

  //         $scope.devices.push(device)

  //       });
  //     };

  //   });
  // });

}]);