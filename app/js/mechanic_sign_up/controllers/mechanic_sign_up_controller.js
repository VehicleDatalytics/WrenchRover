var baseUrl = require('../../config').baseUrl;

module.exports = function(app) {
  app.controller('mechanicSignUpController', ['wrResource', '$http', '$state', 'modalService', function(Resource, $http, $state, modalService) {

    this.servicecenters = [];
    this.service_center_name =
    this.errors = [];
    var remote = new Resource(this.servicecenters, this.errors, baseUrl + 'service_centers', { errMessages: { getAll: 'custome error message' } });

    this.getAll = remote.getAll.bind(remote);
    this.signedInUser = null;
    var that = this;

    this.service = modalService;
    // console.log(modalService.instance);

    this.closeModal = function() {
      console.log(modalService.instance);
      modalService.instance.close();
    };

    this.createServiceCenter = function(resource) {

      this.resource = resource;
      this.resource.service_email = this.servicecenter.user_email;
    //   this.resouce.user_id = JSON.parse(localStorage.getItem('user_id'));
      console.log(this.resource.service_email);

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
        res.headers.Authorization = res.data.auth_token;
        this.token = res.data.auth_token;
        window.localStorage.token = this.token;
        $http.defaults.headers.common.Authorization = localStorage.getItem('token');
        console.log($http.defaults.headers.common.Authorization);
      })
      .then(() => {
        this.resource.user_id = JSON.parse(localStorage.getItem('user_id'));
        $http.post(baseUrl + 'service_centers', resource)
        .then((res) => {
          console.log(res);
          window.localStorage.service_center_id = res.data.id;
        });
      })
      .then(() => {
        $state.go('sc_portal_view.pending_view');
      })
      .then(() => {
        that.closeModal();
      });


    });


    };

    this.login = function(resource) {
      $http.post(baseUrl + 'authenticate', resource)
      .then((res) => {
        this.message = 'Welcome back! Taking you to your portal now!';
        res.headers.Authorization = res.data.auth_token;
        this.token = res.data.auth_token;
        $http.defaults.headers.common.Authorization = this.token.toString();
        console.log($http.defaults.headers.common.Authorization);
        window.localStorage.token = this.token;
        this.signedInUser = resource.user_email;
      })
    .then(() => {
      $http.get(baseUrl + 'service_centers').
      then((res) => {
        for (var i = 0; i < res.data.length; i++) {
          if (res.data[i].service_email === this.signedInUser) {
            window.localStorage.user_id = res.data[i].id;
            window.localStorage.service_center_id = res.data[i].id;
          } else {
            console.log('no');
          }
        }
      })
      .then(() => {
        // $state.go('sc_portal_view.pending_view');
        $state.go('sc_portal_view');
      });
    })
    .catch(() => {
      this.message = 'Sorry, either your email or your password was wrong. Try again.';
    })
    .then(() => {
      that.closeModal();
    });


    };
  }]);
};
