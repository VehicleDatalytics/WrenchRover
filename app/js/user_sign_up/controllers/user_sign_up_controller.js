
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
        } else this.requests.push(arrFilter[i]);
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
          window.localStorage.token = this.token;
          $http.defaults.headers.common.Authorization = localStorage.getItem('token');
          console.log($http.defaults.headers.common.Authorization);
        })

        .success(() => {
          console.log(3);
          $http.post(baseUrl + 'service_requests', this.serviceRequests)
          .success((config) => {
            console.log(config);
            window.localStorage.service_requests = JSON.stringify(config);
            this.auto.service_request_id = config.id;
            window.localStorage.service_request_id = config.id;
            // window.localStorage.service_requests = config.service_requests;

          })

          .success(() => {
            console.log(new Date().getTime());
            $http.post(baseUrl + 'autos', this.auto)
            .success((config) => {
              console.log(config);
            //   console.log(this.auto.service_request_id);
              console.log(new Date().getTime());
            //   console.log(config);
              console.log('auto obj: ');
              console.log(this.auto);


            //   window.localStorage.service_requests = JSON.stringify(config.service_request);
              console.log(new Date().getTime());
              console.log(window.localStorage.service_requests);

              this.srthing = JSON.parse(localStorage.getItem('service_requests'));
              console.log(this.srthing);

            });
          })
          .success(() => {
            console.log(JSON.parse(localStorage.getItem('service_requests')));
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
        for (var i = 0; i < config.length; i++) {
          if (config[i].user_email === this.signedInUser) {
            console.log(config[i].id);
            console.log(config[i]);
            window.localStorage.user_id = config[i].id;

            // //////
            window.localStorage.service_requests = JSON.stringify(config[i].service_requests[0]);

            // ///
            window.localStorage.service_request_id = config[i].service_requests[0].id;
          } else {
            console.log('no');
          }
        }
      })
      .success(() => {
        console.log(JSON.parse(localStorage.getItem('service_requests')));
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
