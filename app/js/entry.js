const angular = require('angular');
require('angular-google-maps');
require('angular-simple-logger');
require('lodash');

const wrApp = angular.module('wrApp', [require('angular-route'), require('angular-ui-bootstrap'), require('angular-resource'), 'uiGmapgoogle-maps']);

require('./services')(wrApp);
require('./maps')(wrApp);
require('./vehicle')(wrApp);


wrApp.config(['$routeProvider', function($rp) {
  $rp
    .when('/', {
      templateUrl: 'templates/vehicle/vehicle_dropdown_selection.html',
      controller: 'VehicleInfoController',
      controllerAs: 'VehicleInfoController'
    })
    .when('/map', {
      templateUrl: 'templates/maps/views/map_view.html',
      controller: 'MapController',
      controllerAs: 'xxctrl'
    })
    .otherwise({
      redirectTo: '/'
    });
}]);
