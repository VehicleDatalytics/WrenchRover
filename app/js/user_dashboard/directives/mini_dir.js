module.exports = function(app) {
  app.directive('miniDir', () => {
    return {
      restrict: 'E',
      controller: 'UserDashboardController',
      controllerAs: 'UserDashCtrl.',
      transclude: true,
      templateUrl: 'templates/user/directives/mini_dir.html',
      scope: {
        // x: '='

      },
      link: function(scope, element, attrs, controller) {


      }
    };
  });
};
