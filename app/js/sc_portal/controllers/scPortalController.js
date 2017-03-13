
var baseUrl = require('../../config').baseUrl;
module.exports = function(app) {
  app.controller('scPortalController', ['$http', 'modalService', '$window', function($http, modalService, $window) {


    var that = this;
    this.modalService = modalService;
    this.servicerequests = [];
    this.workrequests = [];
    this.servicequotes = [];
    this.pastbids = [];
    this.acceptedbids = [];
    this.service_request_id_arr = [];
    this.incoming_sr_arr = [];
    $http.defaults.headers.common.Authorization = localStorage.getItem('token');
    this.service_center_id = localStorage.getItem('service_center_id');
    console.log(this.service_center_id);
    this.your_appointments = [];


    this.getAll = () => {


      if (localStorage.getItem('remainingRequests')) {
        this.workrequests = JSON.parse(localStorage.getItem('remainingRequests'));
        console.log('take care of the few that remain');
        console.log(this.workrequests);

      } else {
        //   mallard

        // that.getQuotes();

        $http.get(baseUrl + '/service_requests')
          .then((res) => {
            console.log(res.data);
            console.log(res.data[0].service_quotes);
            for (var i = 0; i < res.data.length; i++) {
              this.incoming_sr_arr.push(res.data[i].id);
            }

            // console.log(this.service_request_id_arr);

            function check(elem) {
              return that.service_request_id_arr.indexOf(elem) === -1;
            }


            var filteredArr = this.incoming_sr_arr.filter(check);
            console.log(filteredArr);
            console.log(this.incoming_sr_arr);
            console.log(this.service_request_id_arr);
            this.workrequests.splice(0);
            for (var i = 0; i < res.data.length; i++) {
            //   console.log(res.data[i].id);
              console.log(filteredArr.indexOf(res.data[i].id));
              if (filteredArr.indexOf(res.data[i].id) > -1) {
                this.workrequests.push(res.data[i]);
              }

            }


            for (var i = 0; i < res.data.length; i++) {
              res.data[i].converted = new Date(res.data[i].created_at);
              res.data[i].convertedToString = res.data[i].converted.toString();
            //   this.workrequests.push(res.data[i]);
            }

            console.log(this.workrequests);
            console.log(this.servicequotes);
            // console.log(this.incoming_sr_arr);
          });
      }

    };

    // this.getQuotes();
    this.getQuotes = function() {
      console.log('geting the quotesz');
      $http.get(baseUrl + '/service_quotes')
      .then((res) => {
        console.log(res.data);
        // this.servicerequests = res.data;
        this.servicequotes.splice(0);

        this.your_appointments.splice(0);


        // res.data[i].converted = new Date(res.data[i].created_at);
        // res.data[i].convertedToString = res.data[i].converted.toString();

        for (var i = 0; i < res.data.length; i++ ) {
          if (res.data[i].service_center_id == this.service_center_id && res.data[i].accepted != null) {
            // res.data[i].converted = new Date(res.data[i].created_at);
            // res.data[i].convertedToString = res.data[i].converted.toString();
            this.your_appointments.push(res.data[i]);
          }
        }
      });

      console.log(this.your_appointments);

    //   console.log( this.service_request_id_arr);
    //   return this.servicequotes;
    };

    this.getQuotes();

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
      $http.get(baseUrl + '/service_quotes')
      .then((res) => {
        console.log(res.data);
        this.pastbids.splice(0);
        this.acceptedbids.splice(0);
        for (var i = 0; i < res.data.length; i++) {
        //   console.log(res.data[i].service_center_id);
          if (res.data[i].service_center_id !== null && res.data[i].service_center_id == this.service_center_id) {
            this.service_request_id_arr.push(res.data[i].service_request_id);

            // //
            res.data[i].converted = new Date(res.data[i].created_at);
            res.data[i].convertedToString = res.data[i].converted.toString();
            // /

            // console.log(this.pastbids);
            console.log(res.data[i]);
            this.pastbids.push(res.data[i]);
            console.log(this.pastbids);
            if (res.data[i].accepted != null) {
              console.log('not null');
              this.acceptedbids.push(res.data[i]);
            }
          }
        }

        console.log(this.service_request_id_arr);
      });
    //   return this.pastbids;
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
