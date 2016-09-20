const angular = require('angular');
require('angular-google-maps');
require('angular-simple-logger');
require('lodash');

const wrApp = angular.module('wrApp', [require('angular-route'), require('angular-ui-bootstrap'), require('angular-resource'), 'uiGmapgoogle-maps'])


.config(['uiGmapGoogleMapApiProvider', function(GoogleMapApi) {
  GoogleMapApi.configure({
    // key: PROCESS.ENV.GMAP,
    v: '3.17',
    libraries: 'places'
  });
}])

.run(['$templateCache', function($templateCache) {
  $templateCache.put('searchbox.tpl.html', '<input id="pac-input" class="pac-controls" type="text" placeholder="Search">');
  $templateCache.put('window.tpl.html', '<div ng-controller="WindowCtrl" ng-init="showPlaceDetails(parameter)">{{place.name}}</div>');
}]);

require('./services')(wrApp);
require('./maps')(wrApp);
require('./searchBox')(wrApp);


wrApp.config(['$routeProvider', function($rp) {
  $rp
    .when('/map', {
      templateUrl: 'templates/maps/views/map_view.html',
      controller: 'MapController',
      controllerAs: 'xxctrl'
    })
    .when('/searchbox', {
      templateUrl: 'templates/searchBox/views/searchbox_view.html',
      controller: 'SearchBoxController'
    })
    .otherwise({
      redirectTo: '/map'
    });
}]);
