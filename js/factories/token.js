'use strict';

var tube = angular.module("tube");

tube.factory('tokenFactory', ['$http', '$cookies', 'base64', 'servicesConfig', function($http, $cookies, base64, servicesConfig) {

  $http.defaults.headers.common.Authorization = 'Basic ' + base64.encode('democlient:NDFkZGJjMDUtNzJmNi00');

  return {
    getToken: function(email, password){
      return $http.get(servicesConfig.demoService + "/token?grant_type=password&scope=*,scope://qcasting/_demo&email="+email+"&password="+password);
    },
    getAccessToken: function(){
      return $cookies.access_token || $cookies.token_access_token;
    }
  };

}]);