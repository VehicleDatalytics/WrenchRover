
var baseUrl = require('../../config').baseUrl;
module.exports = function(app) {
  app.controller('scPortalController', ['$http', function($http) {

    this.servicerequests = [];
    this.workrequests = [];

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

    // datepicker:
    // ///
    this.today = function() {
      this.dt = new Date();
    };
    this.today();
    this.clear = function() {
      this.dt = null;
    };

    this.options = {
      customClass: getDayClass,
      minDate: new Date(),
      showWeeks: true
    };
// Disable weekend selection
    function disabled(data) {
      var date = data.date,
        mode = data.mode;
      return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
    }
    this.toggleMin = function() {
      this.options.minDate = this.options.minDate ? null : new Date();
    };

    this.toggleMin();
    this.setDate = function(year, month, day) {
      this.dt = new Date(year, month, day);
    };

    var tomorrow = new Date();

    tomorrow.setDate(tomorrow.getDate() + 1);
    var afterTomorrow = new Date(tomorrow);
    afterTomorrow.setDate(tomorrow.getDate() + 1);

    this.events = [
      {
        date: tomorrow,
        status: 'full'
      },
      {
        date: afterTomorrow,
        status: 'partially'
      }
    ];

    function getDayClass(data) {
      var date = data.date,
        mode = data.mode;
      if (mode === 'day') {
        var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

        for (var i = 0; i < this.events.length; i++) {
          var currentDay = new Date(thise.events[i].date).setHours(0, 0, 0, 0);

          if (dayToCheck === currentDay) {
            return this.events[i].status;
          }
        }
      }

      return '';
    }


    // ////
  }
  ]
  );
};
