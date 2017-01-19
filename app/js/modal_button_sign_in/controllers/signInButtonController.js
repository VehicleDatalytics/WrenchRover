
module.exports = function(app) {
  app.controller('signInButtonController', ['$uibModal', '$log', '$document', '$http', 'modalService', function($uibModal, $log, $document, $http, modalService ) {

    console.log('sign in button controller');

    this.service = modalService;
    var that = this;

    this.open = function(parentSelector) {


      this.modalObj = {
        templateUrl: 'templates/modal/directives/modal_sign_in.html',
        controller: 'signInController',
        controllerAs: 'userctrl'

      };

      var modalInstance = $uibModal.open(this.modalObj);
      this.pass = function(modalInstance) {
        console.log(modalInstance);
        modalService.pass(modalInstance);
      };


      this.pass(modalInstance);
    //   modalInstance.result.then(() => {
    //     console.log('dismissed it');
    //   });

    };


  }]);
};
