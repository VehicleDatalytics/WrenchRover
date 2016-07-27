require('angular');
require('angular-google-maps');
require('lodash');

var baseUrl = require('../../config').baseUrl;

module.exports = function(app) {
  app.controller('MapController', ['wrResource', '$http', '$scope', function( Resource, $http, $scope) {


    $scope.map = {
      center: {
        latitude: 47.610326, longitude: -122.199138
      },
      zoom: 12,
      bounds: {} };

    $scope.options = {
      scrollwheel: false
    };


    var latitude = [];
    var longitude = [];
    var place = [];

    var createMarker = function(i, bounds, idKey) {
/* eslint-disable no-eq-null*/
/* eslint-disable eqeqeq*/
      if (idKey == null) {
        idKey = 'id';
      }
      var ret = {
        latitude: latitude[i],
        longitude: longitude[i],
        place: place[i],
        title: 'm' + i,
        show: false
      };

      ret[idKey] = i;
      return ret;
    };

    $scope.onClick = function(marker, eventName, model) {
      model.show = !model.show;
    };

    $scope.randomMarkers = [];

    $scope.$watch(
         () => {
           return $scope.map.bounds;
         }, (nv, ov) => {
      if (!ov.southwest && nv.southwest) {
        var markers = [];
        $http.get(baseUrl + '/api/serviceCenters')
                 .then((res) => {
                   for (var i = 0; i <= res.data.length; i++) {
                     latitude.push(47.610326);
                     longitude.push(-122.199138);
                     place.push('Jiffy Lube');
                     markers.push(createMarker(i, $scope.map.bounds));
                   }
                 });

        $scope.randomMarkers = markers;

      }
    }, true);

  }]);
};
