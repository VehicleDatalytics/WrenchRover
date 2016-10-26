
var baseUrl = require('../../config').baseUrl;
module.exports = function(app) {
  app.controller('scPortalController', ['$http', function($http) {

    this.servicerequests = [];
    this.workrequests = [];
    this.sample = [{
      one: 'b',
      two: 'c'
    },
{ one: 'd',
two: 'e' }];

    this.getAll = () => {
      $http.get(baseUrl + '/service_requests')
      .then((res) => {
        this.servicerequests = res.data;


        this.workrequests.splice(0);
        for (var i = 0; i < res.data.length; i++) {
          this.workrequests.push(res.data[i]);
        }

        console.log(this.servicerequests);
      });
    };
    this.getAll();
  }
  ]
  );
};
