module.exports = function(app) {
  app.directive('timeDir', () => {
    return {
      restrict: 'E',
      controller: 'timeController',
      controllerAs: '$ctrl',
      transclude: true,
      templateUrl: 'templates/time/directives/time.html',
      scope: {
        x: '='

      },
      link: function(scope, element, attrs, controller) {


      }
    };
  });
};
