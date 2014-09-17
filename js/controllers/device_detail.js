'use strict';

var tube = angular.module("tube");

tube.controller('DeviceDetailCtrl', ['$scope', '$location', '$routeParams', 'tokenFactory', 'deviceFactory', 'servicesConfig',
  function($scope, $location, $routeParams, tokenFactory, deviceFactory, servicesConfig){

  var accessToken = tokenFactory.getAccessToken();

  if (!accessToken) {
    $location.path("/");
  }

  window.onStop = function(name){
    console.log("Player on stop");
    init();
  }

  window.onPause = function(name){
    console.log("Player on pause");
    init();
  }

  window.onStart = function(name){
    console.log("Player on start");
  }

  // server: vod 点播, live 直播
  function addPlayer(server, url, type, title){

    console.log(server, url, type, title);

    var script = document.createElement('script');
        script.type = "text/javascript";
        script.src = servicesConfig.playerPath;

    var player = document.getElementById('player');
        player.innerHTML = '';
        player.appendChild(script);

    script.onload = function () {
      SewisePlayer.setup({
        server: server,
        type: type,
        streamurl: url,
        videourl: url,
        starttime: 0,
        lang: "zh_CN",
        title: (title || ""),
        buffer: 5,
        claritybutton: "disable",
        skin: (server == "vod" ? "vodWhite" : "liveWhite"),
        logo: "http://demo.qgenius.com/qcasting/img/qiniu-48x35.png",
        // poster: "images/television-test-screen-no-signal-vector-illustration.jpg",
        // topbardisplay: "disable",
        playername: "Qiniu Multimedia Player",
        copyright: "Copyright (C) 2014 qiniu.com"
      });
    }
  }

  $scope.pushStatusText = "Push";

  var init = function(){
    deviceFactory.info(accessToken, $routeParams.udid).success(function(data) {
      var device = data;
          device['udid'] = $routeParams.udid;

      $scope.pushStatusText = device.status == "connected" ? "Pushing" : "Push";

      $scope.device = device;
    });
  }

  init();


  $scope.push = function(udid){
    $scope.pushStatusText = "Pushing"
    deviceFactory.push_address(accessToken, udid).success(function(data) {
      deviceFactory.pushStart(accessToken, data['url']).success(function(data) {
        console.log(data);
        init();
      });
    });
  }


  $scope.live_rtmp = function(url){
    addPlayer('live', url, 'rtmp', 'RTMP live');
  }


  $scope.live_hls = function(url){
    addPlayer('vod', url, 'm3u8', 'M3U8 live');
  }


  $scope.vodM3U8 = function(udid, starttime, endtime){
    deviceFactory.shift_play_address(accessToken, udid, starttime, endtime).success(function(data) {
      addPlayer('vod', data['url'], 'm3u8', 'M3U8 vod');
    });
  }

}]);