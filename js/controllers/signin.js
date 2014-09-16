'use strict';

var tube = angular.module("tube");

tube.controller('SigninCtrl', ['$scope', '$cookieStore', '$cookies', 'tokenFactory', 'deviceFactory', 'servicesConfig',
  function($scope, $cookieStore, $cookies, tokenFactory, deviceFactory, servicesConfig){

  $scope.devices = [];

  tokenFactory.getToken.success(function(token){

    // $cookieStore.put('token', {
    //   access_token: token.access_token,
    //   expires_in: token.expires_in,
    //   refresh_token: token.refresh_token,
    //   scope: token.scope,
    //   token_type: token.token_type
    // });

    // var date = new Date();

    // date.setDate(date.getDate()+7);

    // date.setMilliseconds(token.expires_in);

    // console.log(token, date);

    // document.cookie = 'token_access_token=' + token.access_token + ';expires=' + date;

    // console.log($cookieStore.get('token'));
    // console.log($cookieStore.get('token_access_token'));

    console.log( $cookies.token_access_token );
  });

}]);