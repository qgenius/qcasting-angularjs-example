'use strict';

var tube = angular.module("tube", ['ngRoute', 'ab-base64']);

tube.config(function($routeProvider, $httpProvider) {
  $routeProvider.when('/devices', { templateUrl: 'templates/devices/index.html', controller:'DeviceCtrl'});
  $routeProvider.when('/devices/:udid', { templateUrl: 'templates/devices/show.html', controller:'DeviceDetailCtrl' });
  $routeProvider.otherwise({redirectTo: '/devices'});

  // $httpProvider.defaults.useXDomain = true;
  // delete $httpProvider.defaults.headers.common['X-Requested-With'];
});

// Config constant
tube.constant('servicesConfig', (function(){
  var protocol = 'http://';
  return {
    demoService: protocol + '115.238.155.186',
    playerPath : "/player/sewise.player.min.js"
  }
})());