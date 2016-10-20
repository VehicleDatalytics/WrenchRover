var baseUrl = require('../../config').baseUrl;

module.exports = function(app) {
  app.controller('userSignUpController', ['wrResource', 'cmService', '$http', function(Resource, cmService, $http) {

    this.count = 0;
    this.service = cmService;
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

    this.getAll = remote.getAll.bind(remote);

    // this.countFunc = function() {
    //   console.log('counting');
    //   that.count = 4;
    //   this.count = that.count;
    // };

    this.createUser = function(resource) {
      this.count++;

      console.log(this.item);
      this.x = {
        user: resource
      };

      remote.create(this.x);
      $http.post(baseUrl + 'autos', this.storedVehicle)
    //   remote.create(testUser)
    .then(
        (res) => {
          console.log(res);
          console.log(res.data.id);
        })
      .then(() => {
        // this.creating = true;
        console.log(this.newUser);
        this.newUser = null;
        // this.concatLS();
        //
        // console.log(this.serviceRequests);
        // var issue = this.serviceRequests;
        // $http.post(baseUrl + 'service_requests', { request_issue: issue });
      });


    }.bind(this);

  }

]);
};
