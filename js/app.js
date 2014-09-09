'use strict';

var tube = angular.module("tube", ['ngRoute', 'ab-base64']);

tube.config(function($routeProvider, $httpProvider) {
  // $routeProvider.when('/devices', { templateUrl: 'templates/devices/list.html', controller:'DeviceDetailCtrl'});
  // $routeProvider.when('/devices/:udid', { controller:'DeviceCtrl' });
  // $routeProvider.otherwise({redirectTo: '/devices'});
});

// Config constant
tube.constant('servicesConfig', (function(){
  var protocol = 'http://';
  return { demoService: protocol + '115.238.155.186'}
})());