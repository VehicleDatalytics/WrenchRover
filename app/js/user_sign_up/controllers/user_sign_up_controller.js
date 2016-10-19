var baseUrl = require('../../config').baseUrl;

module.exports = function(app) {
  app.controller('userSignUpController', ['wrResource', function(Resource) {
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


    this.createUser = function() {
      this.newStringed = JSON.stringify(this.newUser);
      remote.create(this.newStringed)
    //   remote.create(testUser)
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
