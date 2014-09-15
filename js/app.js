'use strict';

var tube = angular.module("tube", ['ngRoute', 'ab-base64']);

tube.config(function($routeProvider, $httpProvider) {
  $routeProvider.when('/devices', { templateUrl: 'templates/devices/index.html', controller:'DeviceCtrl'});
  $routeProvider.when('/devices/:id', { templateUrl: 'templates/devices/show.html', controller:'DeviceDetailCtrl' });
  $routeProvider.otherwise({redirectTo: '/devices'});

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