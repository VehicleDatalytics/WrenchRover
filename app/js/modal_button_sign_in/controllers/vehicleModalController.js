
module.exports = function(app) {
  app.controller('vehicleModalController', ['$uibModal', '$log', '$document', '$http', 'modalService', function($uibModal, $log, $document, $http, modalService ) {

    console.log('vehicle modal controller');

    this.service = modalService;
    // modalService.thing = 3;
    console.log(modalService.thing);
    this.open = function(parentSelector) {

      this.modalObj = {
        templateUrl: 'templates/modal/directives/add_vehicle.html',
        controller: 'signInController',
        controllerAs: 'userctrl'
      };

      var modalInstance = $uibModal.open(
        {
          templateUrl: 'templates/modal/directives/add_vehicle.html',
          controller: 'signInController',
          controllerAs: 'userctrl'
        }


      );
      this.pass = function(modalInstance) {
        modalService.pass(modalInstance);
      };


      this.pass(modalInstance);

    };


  }]);
};
