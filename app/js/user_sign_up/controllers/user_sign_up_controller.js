
var baseUrl = require('../../config').baseUrl;

module.exports = function(app) {
  app.controller('userSignUpController', ['wrResource', '$http', '$state', function(Resource, $http, $state) {


    this.users = [];
    this.errors = [];
    this.allProblems = null;

    this.previousItem;
    this.localStorageOil;
    this.localStorageDash;
    this.localStorageChosen;

    this.signedInUser = null;

    this.previouslyEntered = localStorage.getItem('describeIssue');
    this.localStorageOil = localStorage.getItem('oilChosen');
    this.localStorageDash = localStorage.getItem('dashChosen');
    this.localStorageChosen = localStorage.getItem('chosen');

    var arr = [this.previouslyEntered, this.localStorageOil, this.localStorageChosen, this.localStorageDash];

    var arrFilter = arr.filter((z) => {
      return z != null;
    });

    console.log(arrFilter);

    this.storedVehicle = JSON.parse(localStorage.getItem('vehicle'));

    var remote = new Resource(this.users, this.errors, baseUrl + 'users', { errMessages: { create: 'create error' } });


    if (this.storedVehicle) {
      this.auto = {
        year: this.storedVehicle.year,
        make: this.storedVehicle.make.name,
        model: this.storedVehicle.model.name,
        trim: this.storedVehicle.trim.name,
        engine: this.storedVehicle.engine,
        mileage: this.storedVehicle.mileage,
        user_id: null,
        service_request_id: null
      };
    }

    this.serviceRequests = {
      user_id: null,
      work_request: null
    };

    this.createUser = function(resource) {
      this.requests = [];
      for (var i = 0; i < arrFilter.length; i++) {
        if (Array.isArray(arrFilter[i])) {
          this.requests = this.requests.concat(flatten(arrFilter[i]));
          console.log(this.requests);
        } else this.requests.push(arrFilter[i]);
        console.log(this.requests);
      }
      this.serviceRequests.work_request = this.requests.toString();

      this.x = {
        user: resource
      };

      $http.post(baseUrl + 'users', this.x)
      .success((config) => {
        console.log(1);
        console.log(config);
        this.auto.user_id = config.id;
        this.serviceRequests.user_id = config.id;
        console.log(new Date().getTime());
        window.localStorage.user_id = config.id;
      })

      .success(() => {
        $http.post(baseUrl + 'authenticate', resource)
        .success((data, status, headers, config) => {
          config.headers.Authorization = data.auth_token;
          this.token = data.auth_token;
          $http.defaults.headers.common.Authorization = this.token.toString();
          console.log($http.defaults.headers.common.Authorization);
          window.localStorage.token = this.token;
        })

        .success(() => {
          console.log(3);
          $http.post(baseUrl + 'service_requests', this.serviceRequests)
          .success((config) => {

            this.auto.service_request_id = config.id;
          })

          .success(() => {
            console.log(new Date().getTime());
            $http.post(baseUrl + 'autos', this.auto)
            .success((config) => {
              console.log(this.auto.service_request_id);
              console.log(new Date().getTime());
              console.log(config);
              console.log('auto obj: ');
              console.log(this.auto);
            });
          })
          .success(() => {
            $state.go('user_dashboard');
          });
        });

      });

    }.bind(this);

    this.logIn = function(resource) {
      console.log('loggin in');
      console.log(resource);
      $http.post(baseUrl + 'authenticate', resource)
      .success((data, status, headers, config) => {
        console.log(config);
        console.log(data);
        config.headers.Authorization = data.auth_token;
        this.token = data.auth_token;
        $http.defaults.headers.common.Authorization = this.token.toString();
        console.log($http.defaults.headers.common.Authorization);
        window.localStorage.token = this.token;
        console.log(resource);
        console.log(resource.user_email);
        console.log(this.login.user_email);
        this.signedInUser = resource.user_email;
      })
    .success(() => {
      $http.get(baseUrl + 'users').
      success((config) => {
        console.log(this.signedInUser);
        // console.log(config);
        for (var i = 0; i < config.length; i++) {
        //   console.log(config[i].user_email);
          if (config[i].user_email === this.signedInUser) {
            console.log('yes');
            console.log(config[i].id);
            window.localStorage.user_id = config[i].id;
          } else {
            console.log('no');
          }


        }
      })
      .success(() => {
        console.log('yes');
        $state.go('user_dashboard');
      });
    });

    };

    this.logout = function() {
      console.log('logging out');
      $http.defaults.headers.common.Authorization = '';
    };

  }]);
};
