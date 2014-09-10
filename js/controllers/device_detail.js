'use strict';

var tube = angular.module("tube");

tube.controller('DeviceDetailCtrl', ['$scope', '$routeParams', '$sce', 'tokenFactory', 'deviceFactory', 'servicesConfig',
  function($scope, $routeParams, $sce, tokenFactory, deviceFactory, servicesConfig){

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
    tokenFactory.getToken.success(function(token){
      deviceFactory.info(token.access_token, $routeParams.udid).success(function(data) {
        var device = data;
            device['udid'] = $routeParams.udid;

        $scope.pushStatusText = device.state == "connected" ? "Pushing" : "Push";

        $scope.device = device;
      });
    });
  }

  init();


  $scope.push = function(udid){
    $scope.pushStatusText = "Pushing"
    tokenFactory.getToken.success(function(token){
      deviceFactory.push_address(token.access_token, udid).success(function(data) {
        deviceFactory.pushStart(token.access_token, data['url']).success(function(data) {
          console.log(data);
          init();
        });
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
    tokenFactory.getToken.success(function(token){
      deviceFactory.shift_play_address(token.access_token, udid, starttime, endtime).success(function(data) {
        addPlayer('vod', data['url'], 'm3u8', 'M3U8 vod');
      });
    });
  }

}]);