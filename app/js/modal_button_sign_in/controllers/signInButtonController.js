
module.exports = function(app) {
  app.controller('signInButtonController', ['$uibModal', '$log', '$document', '$http', 'modalService', function($uibModal, $log, $document, $http, modalService ) {

    console.log('sign in button controller');

    this.service = modalService;
    this.open = function(parentSelector) {
      this.modalObj = {
        templateUrl: 'templates/modal/directives/modal_sign_in.html',
        controller: 'signInController',
        controllerAs: 'userctrl'
        // size: 'sm'
      };

      var modalInstance = $uibModal.open(
        {
          templateUrl: 'templates/modal/directives/modal_sign_in.html',
          controller: 'signInController',
          controllerAs: 'userctrl'
        //   size: 'sm'
        }


      );
      this.pass = function(modalInstance) {
        modalService.pass(modalInstance);
      };


      this.pass(modalInstance);

    };


  }]);
};
