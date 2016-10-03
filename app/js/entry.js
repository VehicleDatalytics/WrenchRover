const angular = require('angular');
require('angular-google-maps');
require('angular-simple-logger');
require('lodash');
require('angular-ui-router');

const wrApp = angular.module('wrApp', [require('angular-route'), require('angular-ui-bootstrap'), 'ui.router', 'uiGmapgoogle-maps'])


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
require('./vehicle')(wrApp);
require('./describe')(wrApp);


wrApp.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
.state('user_sign_up_form_view_page_one', {
  url: '/sign_up',
  templateUrl: 'templates/user/views/user_sign_up_form_view_page_one.html',
  controller: 'userSignUpController',
  controllerAs: 'scctrl'

})
.state('mechanic_sign_up', {
  url: '/mechanic_sign_up',
  templateUrl: 'templates/mechanic_sign_up/views/mechanic_sign_up_form_view.html',
  controller: 'mechanicSignUpController',
  controllerAs: 'scctrl'
})

.state('/map_view', {
  url: '/map',
  templateUrl: 'templates/maps/views/map_view.html',
  controller: 'MapController',
  controllerAs: 'xxctrl'
})
.state('vehicle_dropdown_selection', {
  url: '/',
  templateUrl: 'templates/vehicle/vehicle_dropdown_selection.html',
  controller: 'VehicleInfoController',
  controllerAs: 'VehicleInfoController'
})
// fix
// .state('common_repairs_oil', {
//   url: '/common_repairs_oil',
//   templateUrl: 'templates/common_repairs/views/common_repairs_oil.html',
//   controller: 'ExampleController',
//   controllerAs: 'oil'
// })
.state('common_repairs_view', {
  url: '/common_repairs',
  templateUrl:
    'templates/describe/views/common_repairs_view.html',
  controller: 'describeController',
  controllerAs: 'describe'
})

.state('service_list_view', {
  url: '/service_centers',
  templateUrl:
    'templates/service_centers/views/service_list_view.html',
  controller: 'serviceCenterController',
  controllerAs: 'scctrl'
})
.state('common_repairs_view.common_maintenance', {
  url: '/common_maintenance',
  templateUrl: 'templates/describe/views/common.html',
  controller: 'describeController',
  controllerAs: 'describe'
})
.state('common_repairs_view.dash_lights', {
  url: '/dashlights',
  templateUrl: 'templates/describe/views/dash.html',
  controller: 'describeController',
  controllerAs: 'describe'
})

.state('common_repairs_view.describe_issue', {
  url: '/describe_issue',
  templateUrl: 'templates/describe/views/describe.html',
  controller: 'describeController',
  controllerAs: 'describe'
})


;
  $urlRouterProvider.otherwise('/');
});
