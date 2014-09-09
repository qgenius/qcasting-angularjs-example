'use strict';

var tube = angular.module("tube");

tube.controller('DeviceCtrl', ['$scope', '$routeParams', 'tokenFactory', 'deviceFactory', 'servicesConfig',
  function($scope, $routeParams, tokenFactory, deviceFactory, servicesConfig){

  var getById = function(devices, id) {
    for (var i in devices) {
      var device = devices[i];
      if(device['udid'] == id)
        return device
    };
    return null;
  }

  $scope.devices = [];

  tokenFactory.getToken.success(function(token){
    deviceFactory.devices(token.access_token).success(function(data) {
      var devices = data['devices'];
      for (var i in devices) {
        var udid = devices[i];
        deviceFactory.info(token.access_token, udid).success(function(data) {
          var device = data;
              device['udid'] = udid;
          $scope.devices.push(device)
        });
      };
    }).error(function(){
      console.log('error')
    });
  });

  $scope.getInfo = function(udid){
    $scope.current_device = getById($scope.devices, udid);
  }

}]);