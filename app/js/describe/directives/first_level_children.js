module.exports = function(app) {
  app.directive('firstLevelChildren', function() {
    return {
      restrict: 'EAC',
      replace: true,
      require: '^ngController',
      transclude: true,
      templateUrl: '/templates/describe/directives/first_level_children.html',
      scope: {
        description: '='
      },
      link: function(scope, element, attrs, controller) {
        // scope.remove = controller.removeMug;
      }
    };
  });
};
