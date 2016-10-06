module.exports = function(app) {
  app.directive('secondLevelChildren', function($compile) {
    return {
      restrict: 'EAC',
      replace: true,
      controller: 'describeController',
      controllerAs: 'describe',
      transclude: true,
      templateUrl: '/templates/describe/directives/second_level_children.html',

      scope: {

        secondchild: '='
      },
      link: function(scope, element, attrs) {
        // if (angular.isArray(scope.secondchild.children)) {
        //   element.append("<first-level-children data-firstchild='secondchild.children' id = 'hands'  ></first-level-children>");
        //
        //
        //   $compile(element.contents())(scope);
        // }
        // else {
        //   console.log('not appended');
        // }

        // angular.element('#nails').append('<p>afaefageager</p>');

        // console.log(element);


      }
    };
  });
};
