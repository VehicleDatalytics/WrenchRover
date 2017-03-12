
var baseUrl = require('../../config').baseUrl;
module.exports = function(app) {
  app.controller('scPortalController', ['$http', 'modalService', '$window', function($http, modalService, $window) {


    this.modalService = modalService;
    this.servicerequests = [];
    this.workrequests = [];
    this.servicequotes = [];
    this.pastbids = [];
    this.acceptedbids = [];
    $http.defaults.headers.common.Authorization = localStorage.getItem('token');


    this.getAll = () => {
    //   $http.defaults.headers.common.Authorization = localStorage.getItem('token');
    //   console.log(this.getPastBids());
      if (localStorage.getItem('remainingRequests')) {
        this.workrequests = JSON.parse(localStorage.getItem('remainingRequests'));
        console.log('take care of the few that remain');
        console.log(this.workrequests);

      } else {
        $http.get(baseUrl + '/service_requests')
          .then((res) => {
            console.log(res.data);
            this.servicerequests = res.data;
            console.log(this.servicerequests);
            this.workrequests.splice(0);
            for (var i = 0; i < res.data.length; i++) {
              res.data[i].converted = new Date(res.data[i].created_at);
              res.data[i].convertedToString = res.data[i].converted.toString();
              this.workrequests.push(res.data[i]);
              console.log(this.workrequests);
            }

// doesn't work, fix
            var pastbids = this.getPastBids();
            console.log(this.workrequests.indexOf(pastbids));
            console.log(pastbids);
            function checkTwo(value) {
              console.log(value);
              console.log('yes');
              return pastbids.indexOf(value) == -1;
            }
            console.log(this.workrequests);

            console.log(this.workrequests.filter(checkTwo));
          }


      );

      }
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
    //   console.log(this.token);
      console.log(this.service_center_id);
      $http.get(baseUrl + '/service_quotes')
      .then((res) => {
        this.pastbids.splice(0);
        this.acceptedbids.splice(0);
        for (var i = 0; i < res.data.length; i++) {
        //   console.log(res.data[i].service_center_id);
          if (res.data[i].service_center_id !== null && res.data[i].service_center_id == this.service_center_id) {
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

      return this.pastbids;
    };


    this.removeDone = function(value) {
      console.log('remove done');
      console.log(value);
      var item = this.workrequests.indexOf(value);
        //   console.log(this.workrequests.indexOf(value));
      this.workrequests.splice(item, 1);
      console.log(this.workrequests);

      window.localStorage.remainingRequests =
      JSON.stringify(this.workrequests);
    };
  }
  ]
  );
};
