
var baseUrl = require('../../config').baseUrl;

module.exports = function(app) {
  app.controller('userSignUpController', ['wrResource', '$http', function(Resource, $http) {

    this.users = [];
    this.errors = [];
    this.allProblems = null;

    this.previousItem;
    this.localStorageOil;
    this.localStorageDash;
    this.localStorageChosen;


    this.previouslyEntered = localStorage.getItem('describeIssue');
    this.localStorageOil = localStorage.getItem('oilChosen');
    this.localStorageDash = localStorage.getItem('dashChosen');
    this.localStorageChosen = localStorage.getItem('chosen');

    var arr = [this.previouslyEntered, this.localStorageOil, this.localStorageChosen, this.localStorageDash];

    var arrFilter = arr.filter(function(z) {
      return z != null;
    });

    console.log(arrFilter);

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


    this.createUser = function(resource) {
    //   console.log(this.previouslyEntered);
    //   this.concatLS();

    // ///
      this.requests = [];
      for (var i = 0; i < arrFilter.length; i++) {
        if (Array.isArray(arrFilter[i])) {
          this.requests = this.requests.concat(flatten(arrFilter[i]));
        }
        else (this.requests.push(arrFilter[i]));
      }
      console.log('xx');


    // ///

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
          this.x.user['service_requests'] = this.requests;
          console.log(this.requests);
          console.log(this.x.user);

        })
        .then(() => {
          $http.post(baseUrl + 'users', this.x)
          .then((res) => {
            console.log(res);
            console.log(this.newUser);
            this.newUser = null;
            this.y = {
              user_id: res.data.id,
              work_request: this.requests.toString()
            };
            // var issue = this.serviceRequests;
            $http.post(baseUrl + 'service_requests', this.y);
            console.log(this.y);
            console.log(this.requests);
            // console.log(this.totalProblemsArr);

          });

        });

    }.bind(this);

  }

]);
};
