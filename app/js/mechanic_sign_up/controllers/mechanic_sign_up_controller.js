var baseUrl = require('../../config').baseUrl;

module.exports = function(app) {
  app.controller('mechanicSignUpController', ['wrResource', '$http', '$state', function(Resource, $http, $state) {

    this.servicecenters = [];
    this.errors = [];
    var remote = new Resource(this.servicecenters, this.errors, baseUrl + 'service_centers', { errMessages: { getAll: 'custome error message' } });

    this.getAll = remote.getAll.bind(remote);
    this.signedInUser = null;

    this.createServiceCenter = function(resource) {

      this.resource = resource;
      this.resource.service_email = this.servicecenter.user_email;
    //   this.resouce.user_id = JSON.parse(localStorage.getItem('user_id'));
      console.log(this.resource.service_email);

      this.x = {
        user: resource
      };

      $http.post(baseUrl + 'users', this.x)
    .success((config) => {
      console.log(config);
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
        this.resource.user_id = JSON.parse(localStorage.getItem('user_id'));
        $http.post(baseUrl + 'service_centers', resource)
        .success((config) => {
          console.log(config);
          window.localStorage.service_center_id = config.id;
        });
      })
      .success(() => {
        console.log('yes sc');
        $state.go('sc_portal_view');
      });

    });


    };

    this.login = function(resource) {
      console.log(' mech loggin in');
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
        console.log(this.mech.user_email);
        this.signedInUser = resource.user_email;
      })
    .success(() => {
      $http.get(baseUrl + 'service_centers').
      success((config) => {
        // console.log(config);
        console.log(this.signedInUser);
        for (var i = 0; i < config.length; i++) {
          if (config[i].service_email === this.signedInUser) {
            console.log(config[i].id);
            console.log(config[i]);
            window.localStorage.user_id = config[i].id;
            window.localStorage.service_center_id = config[i].id;
          } else {
            console.log('no');
          }
        }
      })
      .success(() => {
        console.log('yes');
        $state.go('sc_portal_view.pending_view');
      });
    });

    };
  }]);
};
