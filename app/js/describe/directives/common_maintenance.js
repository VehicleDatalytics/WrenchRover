module.exports = function(app) {
  app.directive('commonMaintenance', function() {
    return {
      restrict: 'EAC',
      replace: true,
    //   require: 'describeController',
      require: '^ngController',
      transclude: true,
      templateUrl: '/templates/describe/directives/common_maintenance.html',
    //   template: '<p> yes</p>',
      scope: {
        description: '='
      },
      link: function(scope, element, attrs, controller) {
        // scope.remove = controller.removeMug;
      }
    };
  });
};
