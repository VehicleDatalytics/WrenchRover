
module.exports = function(app) {
  app.controller('signInController', function($uibModalInstance) {
    console.log('modal controller open');
    console.log($uibModalInstance);
    var $ctrl = this;

    // this.service = modalService;
    $ctrl.close = function() {
      console.log('okay, then closing');
      $uibModalInstance.close();
    };

    $ctrl.cancel = function() {
      console.log('cancelling');
      $uibModalInstance.dismiss('cancel');
    };

  }
  // ]

);
// ]

};
