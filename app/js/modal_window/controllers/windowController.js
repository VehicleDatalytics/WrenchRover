
module.exports = function(app) {
  app.controller('windowController', function($uibModalInstance) {
    console.log('modal controller open');
    var $ctrl = this;
    console.log($uibModalInstance);

    $ctrl.ok = function() {
      $uibModalInstance.close();
    };

    $ctrl.cancel = function() {
      $uibModalInstance.dismiss('cancel');
    };

  });


};
