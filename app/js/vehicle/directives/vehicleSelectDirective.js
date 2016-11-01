module.exports = exports = function(app) {
  app.directive('myVehicleSelect', function() {
    return {
      restrict: 'EAC',
      controller: 'VehicleInfoController',
      controllerAs: 'VehicleInfoController',
      templateUrl: '/templates/vehicle/directives/vehicle_dropdown_selection.html',
      transclude: true,
      scope: {
        
      },
      link: function(scope, element, attrs, controller) {
        var clicks = {
          localStorage: controller.saveToLocalStorage
        };
        scope.save = clicks[scope.click];
      }
    };
  });
};
