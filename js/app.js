'use strict';

var tube = angular.module("tube", ['ngRoute', 'ngCookies', 'ab-base64']);

tube.config(function($routeProvider, $httpProvider) {
  $routeProvider.when('/', { templateUrl: 'templates/users/signin.html', controller:'SigninCtrl'});
  $routeProvider.when('/devices', { templateUrl: 'templates/devices/index.html', controller:'DeviceCtrl'});
  $routeProvider.when('/devices/:udid', { templateUrl: 'templates/devices/show.html', controller:'DeviceDetailCtrl' });
  $routeProvider.otherwise({redirectTo: '/'});

  // $httpProvider.defaults.useXDomain = true;
  // delete $httpProvider.defaults.headers.common['X-Requested-With'];
});

// Config constant
tube.constant('servicesConfig', (function(){
  return {
    demoService: "http://qcasting.qgenius.com",
    // playerPath : "/player/sewise.player.min.js"
    playerPath : "/qcasting/player/sewise.player.min.js"
  }
})());