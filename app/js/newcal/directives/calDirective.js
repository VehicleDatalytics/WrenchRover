module.exports = function(app) {
  app.directive('calDir', () => {
    return {
      restrict: 'E',
      controller: 'calController',
      controllerAs: '$ctrl',
      transclude: true,
      templateUrl: 'templates/newcal/directives/cal_dir.html',
      scope: {
        x: '='

      },
      link: function(scope, element, attrs, controller) {


      }
    };
  });
};
