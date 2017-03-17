
module.exports = function(app) {
  app.controller('signInController', ['modalService', '$uibModalInstance', function(modalService, $uibModalInstance ) {
    console.log('modal controller open');
    console.log($uibModalInstance);
    var $ctrl = this;

    this.service = modalService;
    console.log(modalService.thing);
    modalService.thing = 2;
    console.log(modalService.thing);

    $ctrl.close = function() {
      console.log('okay, then closing');
      $uibModalInstance.close();
    };

    $ctrl.cancel = function() {
      console.log('cancelling');
      $uibModalInstance.dismiss('cancel');
    };

  }
  ]

);
// ]

};
