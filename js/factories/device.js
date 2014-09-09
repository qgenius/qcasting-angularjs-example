'use strict';

var tube = angular.module("tube");

tube.factory('deviceFactory', ['$http', 'base64', 'servicesConfig', function($http, base64, servicesConfig) {

  var url = servicesConfig.demoService + "/api/v1/devices";

  return {
    devices: function(token){
      return $http.get(url, { headers: {'Authorization' : ' bearer ' + token} });
    },

    info: function(token, udid){
      return $http.get(url +'/'+ udid, { headers: {'Authorization' : ' bearer ' + token} });
    },

    shift_play_address: function(token, udid, starttime, endtime){

      console.log(token, udid, starttime, endtime)

      var qurl = url + '/api/v1/devices/' + udid + '/actions/execute';
      var data = {'cmd': 'play', 'data': {'starttime' : starttime, 'endtime' : endtime}};
      var config = { headers: {'Authorization' : ' bearer ' + token} };

      return $http.post(qurl, data, config);
    }
  };

}]);