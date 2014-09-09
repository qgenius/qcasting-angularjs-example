'use strict';

var tube = angular.module("tube");

tube.factory('tokenFactory', ['$http', 'base64', 'servicesConfig', function($http, base64, servicesConfig) {

  var url = servicesConfig.demoService + "/token?grant_type=password&scope=*,scope://sg/_demo&email=demo@sgw.demo&password=demo";

  $http.defaults.headers.common.Authorization = 'Basic ' + base64.encode('democlient:NDFkZGJjMDUtNzJmNi00');

  return {
    getToken: $http.get(url)
  };

}]);