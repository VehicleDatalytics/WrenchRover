module.exports = function(app) {
  app.directive('oilSecond', function() {
    return {
      restrict: 'EAC',
      replace: true,
    //   require: 'describeController',
      require: '^ngController',
      transclude: true,
      templateUrl: '/templates/describe/directives/oil_second.html',
      scope: {
        oilsecond: '='
      },

      link: function(scope, element, attrs, controller) {
      }
    };
  });
};
