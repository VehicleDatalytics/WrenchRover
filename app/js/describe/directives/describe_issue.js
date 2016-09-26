module.exports = function(app) {
  app.directive('commonRepairs', function() {
    return {
      restrict: 'EAC',
      require: '^ngController',
      transclude: true,
      templateUrl: '/templates/describe/directives/common_repairs.html',

      scope: {
        description: '=',
        buttonText: '@',
        action: '@'
      },
      link: function(scope, element, attrs, controller) {
        var actions = {
          create: controller.describeIt
        };
        scope.save = actions[scope.action];
        scope.describeIt = controller.describeIt;
      }
    };
  });
};
