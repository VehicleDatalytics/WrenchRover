var baseUrl = require('../../config').baseUrl;

module.exports = function(app) {
  app.controller('userSignUpController', ['wrResource', '$http', function(Resource, $http) {

    var that = this;
    this.users = [];
    this.errors = [];
    this.allProblems = null;
    this.previouslyEntered = localStorage.getItem('describeIssue');
    this.localStorageOil = localStorage.getItem('oilChosen');
    this.localStorageDash = localStorage.getItem('dashChosen');
    this.localStorageChosen = localStorage.getItem('chosen');
    this.serviceRequests = [];

    this.concatLS = function() {
      this.serviceRequests = this.previouslyEntered.concat(this.localStorageOil).concat(this.localStorageDash).concat(this.localStorageEntered);
      console.log(this.serviceRequests);
      this.allProblems = this.serviceRequests;
    };

    this.storedVehicle = JSON.parse(localStorage.getItem('vehicle'));

    var remote = new Resource(this.users, this.errors, baseUrl + 'users', { errMessages: { create: 'create error' } });

    this.auto = {
      year: this.storedVehicle.year,
      make: this.storedVehicle.make.name,
      model: this.storedVehicle.model.name,
      trim: this.storedVehicle.trim.name,
      engine: this.storedVehicle.engine,
      mileage: this.storedVehicle.mileage
    //   user_id: 20903
    };

    // this.y = {
    //   user_id: 163,
    //   work_request: this.allProblems
    //
    // };

    // y = {
    //   user_id: res.data.id,
    //   work_request: this.allProblems.toString()
    // };

    this.createUser = function(resource) {


      this.concatLS();


      this.x = {
        user: resource
      };

      console.log(this.auto);
      console.log(this.x.user);

      $http.post(baseUrl + 'autos', this.auto)
    .then(
        (res) => {
          console.log(res);
          console.log(res.data.id);
          this.x.user['auto_id'] = res.data.id;
          this.x.user['service_requests'] = this.allProblems;
          console.log(this.x.user);

        })
        .then(() => {
        //   remote.create(this.x);

          $http.post(baseUrl + 'users', this.x)
          .then((res) => {
            console.log(res);
            console.log(this.newUser);
            this.newUser = null;
            y = {
              user_id: res.data.id,
              work_request: this.allProblems.toString()
            };
            var issue = this.serviceRequests;
            $http.post(baseUrl + 'service_requests', y);
            console.log(this.y);
            console.log(this.serviceRequests);

          });

        });
        // .then((res) => {
        //   console.log(res);
        //   console.log(this.newUser);
        //   this.newUser = null;
        //   y = {
        //     user_id: res.data.id,
        //     work_request: this.allProblems.toString()
        //   };
        //   var issue = this.serviceRequests;
        //   $http.post(baseUrl + 'service_requests', y);
        //   console.log(this.y);
        //   console.log(this.serviceRequests);
        //
        // });


    }.bind(this);

  }

]);
};
