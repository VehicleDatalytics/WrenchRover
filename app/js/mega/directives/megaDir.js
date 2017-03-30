module.exports = function(app) {
  app.directive('megaDir', () => {
    return {
      restrict: 'E',
      controller: 'megaController',
      controllerAs: '$ctrl',
      transclude: true,
      templateUrl: 'templates/mega/directives/mega_dir.html',
      scope: {
        // x: '='

      },
      link: function(scope, element, attrs, controller) {


      }
    };
  });
};
