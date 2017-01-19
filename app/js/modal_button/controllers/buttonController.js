
module.exports = function(app) {
  app.controller('buttonController', ['$uibModal', '$log', '$document', '$http', 'modalService', function($uibModal, $log, $document, $http, modalService) {
    this.theCookie = navigator.cookieEnabled;
    console.log(this.theCookie);
    var that = this;
    this.service = modalService;
    var that = this;
    //
    console.log('button controller');
    // this.open = function(parentSelector) {
    //
    //   this.modalObj = {
    //     templateUrl: 'templates/modal/directives/modal_sign_in.html',
    //     controller: 'signInController',
    //     controllerAs: 'userctrl'
    //
    //   };
    //
    //   var modalInstance = $uibModal.open(this.modalObj);
    //   this.pass = function(modalInstance) {
    //     console.log(modalInstance);
    //     modalService.pass(modalInstance);
    //   };
    //
    //
    //   this.pass(modalInstance);
    // //   modalInstance.result.then(() => {
    // //     console.log('dismissed it');
    // //   });
    //
    // };

    this.open = function(parentSelector) {
      var parentElem = parentSelector ?
             angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;

      var modalInstance = $uibModal.open({
        templateUrl: 'templates/modal/directives/modal_directive.html',
        controller: 'windowController',
        controllerAs: '$ctrl',
        appendTo: parentElem
      });

      modalInstance.result.then(() => {
        console.log('dismissed');
      }, () => {
        $log.info('Modal dismissed at: ' + new Date());
      });

      that.exit = function() {
        modalInstance.result.then(() => {
          console.log('dismissed from buttonController');
        });
      };

    };


  }]);
};
