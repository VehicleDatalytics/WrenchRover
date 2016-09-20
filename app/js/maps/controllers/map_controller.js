require('angular');
require('angular-google-maps');
require('lodash');

var baseUrl = require('../../config').baseUrl;

module.exports = function(app) {
  app.controller('WindowCtrl', function($scope) {
    $scope.place = {};
    $scope.showPlaceDetails = function(param) {
      $scope.place = param;
    };
  });

  app.controller('MapController', ['$scope', '$timeout', 'uiGmapLogger', '$http', 'uiGmapGoogleMapApi'
  , function($scope, $timeout, $log, $http, GoogleMapApi) {

    $scope.toggleMap = function() {
      $scope.searchbox.options.visible = !$scope.searchbox.options.visible;
    };

    GoogleMapApi.then(function(maps) {
      maps.visualRefresh = true;
      $scope.defaultBounds = new google.maps.LatLngBounds(
new google.maps.LatLng(47.82148, -122.66450),
new google.maps.LatLng(47.66541, -122.31715));


    });

    count = 0;
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
    var addresses = [];
    console.log('lat: ' + latitude);
    console.log(addresses);


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

        console.log(latitude);


        $http.get(baseUrl + '/service_centers')
                 .then((res) => {


                   for (var i = 10; i < res.data.length - 1; i++) {
                     console.log('i: ' + i);

                     geocodeAddress(res.data[i].service_address + ', ' + res.data[i].service_city + ', ' + res.data[i].service_state, function(latLng) {

                       count++;
                       console.log(count);
                       for (var j = 0; j < 1; j++) {

                         latitude.push(latLng.lat());
                         longitude.push(latLng.lng());
                         console.log(latLng.lat(), latLng.lng());

                         markers.push(createMarker(i, $scope.map.bounds));
                       }

                     }
                 );

                   }

                 });


        $scope.randomMarkers = markers;


        var geocodeAddress = function(address, callback) {

          var geocoder = new google.maps.Geocoder();

          geocoder.geocode( { 'address': address }, function(results, status) {
            console.log(address);
            if (status == google.maps.GeocoderStatus.OK) {
              callback(results[0].geometry.location);
            } else {
              console.log('Geocode was not successful for the following reason: ' + status);
            }
            for (var i = 0; i < longitude.length - 1; i++) {
              markers.push(createMarker(i, $scope.map.bounds));
            }
          });
        };


      }
    }, true);


  }]);
};
