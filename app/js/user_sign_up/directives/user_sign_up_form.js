module.exports = function(app) {
  app.directive('userSignUpFormPageOne', function() {
    return {
      restrict: 'EAC',
      require: '^ngController',
      transclude: true,
      templateUrl: '/templates/user/directives/user_sign_up_form_page_one.html',

      scope: {
        user: '=',
        buttonText: '@',
        action: '@'
      },
      link: function(scope, element, attrs, controller) {
        var actions = {
        //   update: controller.updateMug,
          create: controller.createUser
        };
        scope.save = actions[scope.action];
      }
    };
  });
};
