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
require('./service_centers')(wrApp);
require('./mechanic_sign_up')(wrApp);
require('./user_sign_up')(wrApp);
require('./common_repairs')(wrApp);


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
    .when('/searchbox', {
      templateUrl: 'templates/searchBox/views/searchbox_view.html',
      controller: 'SearchBoxController'
    })
    .when('/servicecenters', {
      templateUrl: 'templates/service_centers/views/service_list_view.html',
      controller: 'serviceCenterController',
      controllerAs: 'scctrl'
    })
    .when('/mechanic_sign_up', {
      templateUrl: 'templates/mechanic_sign_up/views/mechanic_sign_up_form_view.html',
      controller: 'mechanicSignUpController',
      controllerAs: 'scctrl'
    })
    .when('/user_page_one', {
      templateUrl: 'templates/user/views/user_sign_up_form_view_page_one.html',
      controller: 'userSignUpController',
      controllerAs: 'userctrl'
    })
    .when('/user_page_two', {
      templateUrl: 'templates/user/views/user_sign_up_form_view_page_two.html',
      controller: 'userSignUpController',
      controllerAs: 'userctrl'
    })
    .when('/carproblems', {
      templateUrl: 'templates/common_repairs/views/common_repairs_view.html',
      controller: 'ExampleController',
      controllerAs: 'oil'
    })
    .otherwise({
      redirectTo: '/'
    });
}]);
