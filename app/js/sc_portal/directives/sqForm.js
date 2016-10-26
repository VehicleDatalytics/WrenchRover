module.exports = function(app) {
  app.directive('sqForm', function() {
    return {
      restrict: 'EAC',
      require: '^ngController',
      controller: 'scPortalController',
      controllerAs: 'portal',
      transclude: true,
      templateUrl: '/templates/sc_portal/directives/sq_form.html',

      scope: {
        sq: '=',
        buttonText: '@',
        action: '@'
      },
      link: function(scope, element, attrs, controller) {
        console.log('controller: ', controller);
        console.log('scope:', scope);
        var actions = {
        //   update: controller.updateMug,
          create: controller.createServiceCenter
        };
        scope.save = actions[scope.action];
      }
    };
  });
};
