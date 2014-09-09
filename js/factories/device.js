'use strict';

var tube = angular.module("tube");

tube.factory('deviceFactory', ['$http', 'base64', 'servicesConfig', function($http, base64, servicesConfig) {

  var url = servicesConfig.demoService + "/api/v1/devices";

  return {
    devices: function(token){
      return $http.get(url, { headers: {'Authorization' : ' bearer ' + token} })
    },

    info: function(udid, token){
      return $http.get(url +'/'+ udid, { headers: {'Authorization' : ' bearer ' + token} })
    }
  };

}]);