module.exports = exports = function(app) {
  app.controller('UserDashboardController', ['userDashboardResource', function(UserDashResource) {

    // this.user_id = localStorage.getItem('user_id');
    this.user_id = JSON.parse(localStorage.getItem('user_id'));

    this.userObject = {
      id: this.user_id,
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


  }]);
};
