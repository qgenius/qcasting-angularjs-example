'use strict';

var tube = angular.module("tube");

tube.controller('SigninCtrl', ['$scope', '$location', '$cookies', 'base64', 'tokenFactory', 'deviceFactory', 'servicesConfig',
  function($scope, $location, $cookies, base64, tokenFactory, deviceFactory, servicesConfig){

  var accessToken = tokenFactory.getAccessToken();

  console.log(accessToken);

  if (accessToken) {
    $location.path("/devices");
  }else{

    $scope.submit = function(){
      // email: qcasting-demo@qgenius.com
      // password: demo

      tokenFactory.getToken($scope.email, $scope.password).success(function(token){

        var date = new Date();
        date.setTime(token.expires_in * 1000);

        document.cookie = 'token_access_token=' + token.access_token + ';expires=' + date;

        var expire = new Date((new Date()).getTime() + 365*24*60*60*1000);
        expire = "; expires=" + expire.toGMTString();

        document.cookie = 'token_refresh_token=' + token.refresh_token + expire;

        $cookies.access_token = token.access_token;

        // document.cookie = 'token_scope=' + base64.encode(token.scope) + ';expires=' + date;
        // document.cookie = 'token_token_type=' + token.token_type + ';expires=' + date;
        $location.path("/devices");
      }).error(function(message){
        alert(message.error_description);
      });
    }
  }


}]);