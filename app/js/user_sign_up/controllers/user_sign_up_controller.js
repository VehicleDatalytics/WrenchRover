// userSignupcontroller storage while i experiment
var baseUrl = require('../../config').baseUrl;

var modalObj = require('../../modalObject').modalObj;

module.exports = function(app) {
  app.controller('userSignUpController', ['wrResource', '$http', '$state', 'wrHandleError', 'modalService', '$uibModal', '$window', function(Resource, $http, $state, wrError, modalService, $uibModal, $window) {
    var that = this;
    this.msg = 'Create New Account';
    this.errorMsg = null;


    this.service = modalService;

    this.users = [];
    this.errors = [];
    this.allProblems = null;
    this.previousItem;
    this.localStorageOil;
    this.localStorageDash;
    this.localStorageChosen;


    this.message = null;


    this.previouslyEntered = localStorage.getItem('describeIssue');
    this.localStorageOil = localStorage.getItem('oilChosen');
    this.localStorageDash = localStorage.getItem('dashChosen');
    this.localStorageChosen = localStorage.getItem('chosen');


    var arr = [this.previouslyEntered, this.localStorageOil, this.localStorageChosen, this.localStorageDash];

    var arrFilter = arr.filter((z) => {
      return z != null;
    });


    this.storedVehicle = JSON.parse(localStorage.getItem('vehicle'));

    var remote = new Resource(this.users, this.errors, baseUrl + 'users', { errMessages: { create: 'create error' } });


    if (this.storedVehicle) {
      this.auto = {
        year: this.storedVehicle.year,
        make: this.storedVehicle.make.name,
        model: this.storedVehicle.model.name,
        trim: this.storedVehicle.trim.name,
        engine: this.storedVehicle.engine,
        mileage: this.storedVehicle.miles,
        user_id: null,
        service_request_id: null
      };
      console.log(this.storedVehicle);
      console.log(this.auto);


    }


    this.serviceRequests = {
      user_id: null,
      work_request: null
    };


    this.closeModal = function() {
      modalService.instance.close();
    };

    this.closeDropDown = function() {
      console.log('closing the drop down');
      modalService.closeDropDown();
    };

//  user sign up from landing page
    this.createUserAlt = function(resource) {
      console.log(resource);
      console.log('alternative');
      this.x = {
        user: resource
      };
      console.log(this.x);
      $http.post(baseUrl + 'users', this.x)
      .then((res) => {
        window.localStorage.user_id = res.data.id;
      })
      .catch((res) => {
        this.errorMsg = 'already taken';
        console.log(res.data.user_email[0]);

      })
      .then(() => {
        console.log(resource);
        $http.post(baseUrl + 'authenticate', resource)

      .then((res) => {
        console.log(resource);
        console.log(res);
        res.config.headers.Authorization = res.data.auth_token;

        that.token = res.data.auth_token;
        window.localStorage.token = that.token;
        $http.defaults.headers.common.Authorization = localStorage.getItem('token');
        // window.localStorage.token = this.token;
        console.log($http.defaults.headers.common.Authorization);
      });
      })
      .then(() => {
        console.log('and he was smilingly certain');
        console.log(that.token);
        console.log(localStorage.getItem('token'));
        $state.go('user_dashboard');
      })
      .then(() => {
        console.log('closing');
        console.log(modalService.thing);
        if (modalService.thing === 2) {
          that.closeModal();

        } else {
          that.closeDropDown();
        }
      });
    }.bind(this);


    this.addServiceRequests = function() {
      console.log('service requesting');
      this.previouslyEntered = localStorage.getItem('describeIssue');
      this.localStorageOil = localStorage.getItem('oilChosen');
      this.localStorageDash = localStorage.getItem('dashChosen');
      this.localStorageChosen = localStorage.getItem('chosen');

      var arr = [this.previouslyEntered, this.localStorageOil, this.localStorageChosen, this.localStorageDash];

      var arrFilter = arr.filter((z) => {
        console.log(z);
        return z != null;
      });
      console.log(arr);
      console.log(arrFilter);
      this.requests = [];
      for (var i = 0; i < arrFilter.length; i++) {
        if (Array.isArray(arrFilter[i])) {
          console.log(arrFilter[i]);
          this.requests = this.requests.concat(flatten(arrFilter[i]));
        } else this.requests.push(arrFilter[i]);
        console.log(arrFilter[i]);
      }

      this.serviceRequests.work_request = this.requests.toString();
      this.serviceRequests.user_id = localStorage.getItem('user_id');
      console.log(this.serviceRequests.user_id);
      this.serviceRequests.auto = {};
      this.serviceRequests.auto.id = localStorage.getItem('auto_id');

      console.log(this.serviceRequests);
      $http.post(baseUrl + 'service_requests', this.serviceRequests)
      .then((res) => {
        console.log(res);
      });
    };


// alt ends
// alt2 begins
    this.createUser2 = function(resource) {

      this.x = {
        user: resource
      };
      $http.post(baseUrl + 'users', this.x)
      .then((res) => {

        window.localStorage.user_id = res.data.id;
      })
       .then(() => {
         $http.post(baseUrl + 'authenticate', resource)
        .then((res) => {
          console.log(res);
          res.config.headers.Authorization = res.data.auth_token;
          this.token = res.data.auth_token;
          window.localStorage.token = this.token;
          $http.defaults.headers.common.Authorization = localStorage.getItem('token');
        })

         .catch((error, status) => {
           console.log('error');
           console.log(error);
           console.log(data);
           this.data.error = { message: error, status: status };
         })


      .then(() => {
        console.log('alt2 signup ending, going to the user dashboard now');
        $state.go('user_dashboard');
      })

      .then(() => {
        console.log('closing');
        console.log(modalService.thing);
        if (modalService.thing === 2) {
          that.closeModal();

        } else {
          that.closeDropDown();
        }

      });


       });


    }.bind(this);
// alt2 ends

    // user sign up via user flow

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
      .then((res) => {
        this.auto.user_id = res.data.id;
        this.serviceRequests.user_id = res.data.id;
        window.localStorage.user_id = res.data.id;
      })
      .then(() => {
        $http.post(baseUrl + 'authenticate', resource)
        .then((res) => {
          res.config.headers.Authorization = res.data.auth_token;
          this.token = res.data.auth_token;
          window.localStorage.token = this.token;
          $http.defaults.headers.common.Authorization = localStorage.getItem('token');
        })

     .catch((error, status) => {
       console.log('error');
       console.log(error);
       console.log(data);
       this.data.error = { message: error, status: status };
     })
        .then(() => {
          $http.post(baseUrl + 'service_requests', this.serviceRequests)
          .then((res) => {
            window.localStorage.service_requests = JSON.stringify(res.data.work_request);
            this.auto.service_request_id = res.data.id;
            window.localStorage.service_request_id = res.data.id;
          })

          .then(() => {
            $http.post(baseUrl + 'autos', this.auto)
            .then((res) => {
              this.srthing = JSON.parse(localStorage.getItem('service_requests'));

            });
          })
          .then(() => {
            console.log('after autos');
            this.message = 'Thank you for signing up!';
            console.log(JSON.parse(localStorage.getItem('service_requests')));
            $state.go('user_dashboard');
          })

          .then(() => {
            console.log('closing');
            console.log(modalService.thing);
            if (modalService.thing === 2) {
              that.closeModal();

            } else {
              that.closeDropDown();
            }

          });


        });

      });


    }.bind(this);

    this.logIn = function(resource) {
      console.log('logging in');
      console.log(this.login.user_email);

      $http.post(baseUrl + 'authenticate', resource)
      .then((res) => {
        console.log(res);
        res.headers.Authorization = res.data.auth_token;
        this.token = res.data.auth_token;
        $http.defaults.headers.common.Authorization = this.token.toString();
        console.log($http.defaults.headers.common.Authorization);
        window.localStorage.token = this.token;
        window.localStorage.user_id = res.data.user_id;
        this.signedInUser = resource.user_email;
        // var x = data.user_id.toString();
        this.user_id = res.data.user_id;

        $http.get(baseUrl + 'users/' + this.user_id )
        .then((res) => {
          console.log('yes');

          console.log(this.signedInUser);
          if (res.data.service_requests.length !== 0 && res.data.autos.length !== 0) {
            window.localStorage.service_requests = JSON.stringify(res.data.service_requests[0]);
          } else {

            console.log('no requests or saved cars');
            this.message = "Are you sure you're not a mechanic?";
          }
        })
      .then((res) => {
        console.log(res);
        if (localStorage.getItem('service_requests')) {
          console.log('GOING TO THE DASHBOARD!');
          $state.go('user_dashboard');
        } else {
          console.log('Should go to mechanic');
        }
      });
      })
      .catch((res) => {
        this.message = 'Sorry, either your email or your password was wrong. Try again.';
      })

      .then(() => {


        if (this.message === 'Sorry, either your email or your password was wrong. Try again.') {
          console.log('sorry again');
        } else {

          console.log(modalService.thing);
          if (modalService.thing === 2) {
            that.closeModal();

          } else {
            that.closeDropDown();
          }

        }

      });

    };


    this.logout = function() {
      console.log('logging out');
      $http.defaults.headers.common.Authorization = '';
      localStorage.clear();
      $state.go('vehicle_dropdown_selection');
    };

  }]);
};
