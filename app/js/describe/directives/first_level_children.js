module.exports = function(app) {
  app.directive('firstLevelChildren', function($compile) {
    return {
      restrict: 'EAC',
      replace: true,
      require: '^ngController',
      transclude: true,
      templateUrl: '/templates/describe/directives/first_level_children.html',
      scope: {
        firstchild: '='
      },

      link: function(scope, element, attrs, controller) {
        // element.append('<p>FIRST LEVEL APPEND</p>');
        // $compile(element.contents())(scope);
        // console.log(element);
        // console.log(scope);
      }
    };
  });
};
