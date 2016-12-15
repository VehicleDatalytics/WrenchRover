
var baseUrl = require('../../config').baseUrl;
module.exports = function(app) {
  app.controller('scPortalController', ['$http', 'scCommService', function($http, scCommService) {
    this.initfunction = function() {
      console.log('iniTting the functions!!!!!');
    };


    this.captured_dates = [];
    this.capture = function(value) {
      console.log(value);

      console.log(new Date(value).toDateString());
      this.captured_dates.push(new Date(value).toDateString());
    };
    if (this.captured_dates.length === 1) {
      this.day_one = this.captured_dates[0];
    }
    if (this.captured_dates.length === 2) {
      this.day_one = this.captured_dates[0];
      this.day_two = this.captured_dates[1];
    }
    if (this.captured_dates.length === 3) {
      this.day_one = this.captured_dates[0];
      this.day_two = this.captured_dates[1];
      this.day_three = this.captured_dates[2];

    }


    // this.mytime = new Date().setHours(0);

    this.ismeridian = true;

    this.timeChange = function(value, value2, value3) {
      console.log(value, value2, value3);
      console.log(value.toLocaleTimeString());
      console.log(value2.toLocaleTimeString());
      console.log(value3.toLocaleTimeString());
    };

    this.service = scCommService;
    this.servicerequests = [];
    this.workrequests = [];
    this.servicequotes = [];
    this.pastbids = [];
    this.acceptedbids = [];


    this.getAll = () => {
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


    var _this = this;
    this.activeDate = null;

    this.selectedDates = [];


    if (this.activeDate = null) {
      this.selectedDates.push(new Date().toLocaleDateString);
      console.log(this.selectedDates);
    }

    this.type = 'individual';
    this.options = {
      customClass: function(data) {
        if (_this.selectedDates.indexOf(data.date) > -1 && _this.selectedDates.length <= 3) {
          return 'selected';
        }
        return '';
      }
    };


    this.type = 'individual';

    this.show2pickers = false;

    this.removeFromSelected = function(dt) {
      _this.selectedDates.splice(_this.selectedDates.indexOf(dt), 1);

      _this.captured_dates.splice(_this.captured_dates.indexOf(new Date(dt).toDateString()), 1);


    //   this.captured_dates.push(new Date(value).toDateString());
    // / Need to change activeDate for datepicker to call customClass again
      _this.activeDate = dt;
      console.log(this.selectedDates);
      console.log(_this.selectedDates);
      console.log(this.selectedDates.length);
      console.log(_this.captured_dates);
      console.log(this.captured_dates);
    };


    this.addDates = function(value) {

      console.log(value);
      if (this.selectedDates.length < 3) {
        this.message = 'Please, pick three dates';
      } else {
        scCommService.addDates(value);
      }
    };


    this.createQuote = function(x, y, z, d, e, f) {
      console.log('creating the quote');
      console.log(x, y, z, d, e, f);
      this.times = [];

      if (d != undefined && e != undefined && f != undefined) {
        var h = d.toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' });

        var i = e.toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' });
        var j = f.toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' });

        this.times.push(h, i, j);
        console.log(this.times);
        console.log(d.toLocaleTimeString());
        console.log(e.toLocaleTimeString());
        console.log(f.toLocaleTimeString());
        console.log(this.selectedDates);
        console.log(this.quote_cost);

    //   scCommService.createQuote(x, y, z, this.selectedDates, this.times);
        this.message = 'Thank you';
        scCommService.createQuote(x, y, z, this.captured_dates, this.times);
      } else {
        console.log('times are undefined');
        this.message = 'Please, select three dates and times';
      }
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
          console.log('loop');
        //   console.log(res.data[i].service_center_id);
          if (res.data[i].service_center_id !== null && res.data[i].service_center_id == this.service_center_id) {
            console.log('yes');
            // console.log(res.data[i].service_center);

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
