module.exports = exports = function(app) {
  app.controller('UserDashboardController', ['userDashboardResource', function(UserDashResource) {
    this.userObject = {
      id: 12,
      userName: '',
      userEmail: '',
      userPhone: '',
      userZip: '',
      memberSince: '',
      autos: [],
      serviceRequests: []
    };
    this.errors = [];

    var userDash = new UserDashResource(this.userObject, this.errors);

    this.getUserInfo = userDash.getUserInfo.bind(userDash);

    this.logUser = function() {
      console.log('user object from controller');
      console.log(this.userObject);
      console.log(this.userObject.serviceRequests);
      for (var i = 0; i < this.userObject.serviceRequests.length; i++) {
        console.log(this.userObject.serviceRequests[i]);
      }
    };


    // app.controller('windowController', function($uibModalInstance) {
    //   console.log('modal controller open');
    //   console.log($uibModalInstance);
    //   var $ctrl = this;
    //   console.log($uibModalInstance);
    //
    //   $ctrl.ok = function() {
    //     console.log('okay, then');
    //     $uibModalInstance.close();
    //   };
    //
    //   $ctrl.cancel = function() {
    //     console.log('cancelling');
    //     $uibModalInstance.dismiss('cancel');
    //   };

  }]);
};
