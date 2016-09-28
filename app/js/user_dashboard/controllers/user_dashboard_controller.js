module.exports = exports = function(app) {
  app.controller('UserDashboardController', ['userDashboardResource', function(Resource) {
    this.userObject = {
      id: 7,
      userName: '',
      userEmail: '',
      userPhone: '',
      userZip: '',
      memberSince: '',
      autos: [],
      serviceQuotes: []
    };
    this.errors = [];

    var resource = new Resource(this.userObject, this.errors);

    this.getUserInfo = resource.getUserInfo.bind(resource);
    this.logUser = function() {
      console.log('user object from controller');
      console.log(this.userObject);
    };
  }]);
};
