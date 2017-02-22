
var baseUrl = require('../../config').baseUrl;
module.exports = function(app) {
  app.controller('scPortalController', ['$http', 'modalService', '$window', function($http, modalService, $window) {


    this.modalService = modalService;
    this.servicerequests = [];
    this.workrequests = [];
    this.servicequotes = [];
    this.pastbids = [];
    this.acceptedbids = [];
    // this.message = 'hiiiiii';
    // if (this.modalService.apptArr >= 3) {
    //   this.message = 'thank you for choosing 3 dates.';
    // }


    this.getAll = () => {
      $http.defaults.headers.common.Authorization = localStorage.getItem('token');
      $http.get(baseUrl + '/service_requests')
      .then((res) => {
        this.servicerequests = res.data;
        this.workrequests.splice(0);
        for (var i = 0; i < res.data.length; i++) {
          this.workrequests.push(res.data[i]);
        }
      });
    };

    this.getQuotes = function() {
      $http.get(baseUrl + '/service_quotes')
      .then((res) => {
        console.log(res.data);
        this.servicerequests = res.data;
        this.servicequotes.splice(0);
        for (var i = 0; i < res.data.length; i++) {
          this.servicequotes.push(res.data[i]);
        }
      });
    };


    this.createQuote = function(sc_user_id, scquote, sc_id, appt_array) {
      console.log(sc_user_id, scquote, sc_id, appt_array);
      this.quote_object = scquote;
      this.quote_object.available_date_1 = appt_array[0];
      this.quote_object.available_date_2 = appt_array[1];
      this.quote_object.available_date_3 = appt_array[2];
      this.quote_object.service_center_id = JSON.parse(localStorage.getItem('service_center_id'));
      this.quote_object.service_request_id = sc_id;
      console.log(this.quote_object);

      $http.post(baseUrl + 'service_quotes', this.quote_object)
      .then((res) => {
        console.log(res);
        this.modalService.appt_array = [];
        $window.location.reload();
      });
    };

    this.getPastBids = function() {
      this.service_center_id = localStorage.getItem('service_center_id');
      console.log(this.token);
      console.log(this.service_center_id);

      $http.get(baseUrl + '/service_quotes')
      .then((res) => {
        this.pastbids.splice(0);
        this.acceptedbids.splice(0);
        for (var i = 0; i < res.data.length; i++) {

        //   console.log(res.data[i].service_center_id);
          if (res.data[i].service_center_id !== null && res.data[i].service_center_id == this.service_center_id) {
            console.log('yes');

            console.log(this.pastbids);
            console.log(res.data[i]);
            this.pastbids.push(res.data[i]);
            console.log(this.pastbids);
            if (res.data[i].accepted != null) {
              console.log('not null');
              this.acceptedbids.push(res.data[i]);
            }

          }
        }
      });


    };
  }
  ]
  );
};
