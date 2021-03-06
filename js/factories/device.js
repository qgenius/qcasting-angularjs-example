'use strict';

var tube = angular.module("tube");

tube.factory('deviceFactory', ['$http', '$q', 'base64', 'servicesConfig', function($http, $q, base64, servicesConfig) {

  var url = servicesConfig.demoService + "/api/v1/devices";

  return {
    // getDeviceInfo: function () {

    //   //定义一个回调服务
    //   var deferred = $q.defer();

    //   //此时获取的是单个数据源
    //   $http.get('/API/Values').success(function (result) {

    //     deferred.resolve(result); //将结果委托回调函数

    //   }).error(function (result) {
    //     debugger;
    //   });

    //   //返回回调函数结果
    //   return deferred.promise;
    // },

    devices: function(token){
      return $http.get(url, { headers: {'Authorization' : ' bearer ' + token} });
    },

    info: function(token, udid){
      return $http.get(url +'/'+ udid, { headers: {'Authorization' : ' bearer ' + token} });
    },

    shift_play_address: function(token, udid, starttime, endtime){
      var qurl = url + '/' + udid + '/actions/execute',
          data = {'cmd': 'play', 'data': {'starttime' : starttime, 'endtime' : endtime}},
          config = { headers: {'Authorization' : ' bearer ' + token} };
      return $http.post(qurl, data, config);
    },

    push_address: function(token, udid){
      var qurl = url + '/' + udid + '/actions/execute',
          data = {'cmd': 'push', 'data': {'protocol' : 'RTMP'}},
          config = { headers: {'Authorization' : ' bearer ' + token} };
      return $http.post(qurl, data, config);
    },

    pushStart: function(token, url){
      var qurl = servicesConfig.demoService + '/api/v1/_demo/devices/demo/actions/push',
          data = {'url': url},
          config = { headers: {'Authorization' : ' bearer ' + token} };
      return $http.post(qurl, data, config);
    }
  };

}]);