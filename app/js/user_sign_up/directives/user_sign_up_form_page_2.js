module.exports = function(app) {
  app.directive('userSignUpFormPageTwo', function() {
    return {
      restrict: 'EAC',
      require: '^ngController',
      transclude: true,
      templateUrl: '/templates/user/directives/user_sign_up_form_page_two.html',

      scope: {
        user: '=',
        buttonText: '@',
        action: '@'
      },
      link: function(scope, element, attrs, controller) {
        var actions = {
          update: controller.updateUser
        //   create: controller.createUser
        };
        scope.save = actions[scope.action];
      }
    };
  });
};
