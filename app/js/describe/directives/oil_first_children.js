module.exports = function(app) {
  app.directive('oilFirstChildren', function() {
    return {
      restrict: 'EAC',
      replace: true,
    //   require: 'describeController',
      require: '^ngController',
      transclude: true,
      templateUrl: '/templates/describe/directives/oil_first_children.html',
      scope: {
        oilfirstchildren: '='
      },

      link: function(scope, element, attrs, controller) {
      }
    };
  });
};
