
var baseUrl = require('../../config').baseUrl;
module.exports = function(app) {
  app.controller('scPortalController', ['$http', function($http) {

    this.servicerequests = [];
    this.workrequests = [];
    this.bid = 'eg. 50.00';
    this.dt2 = 'whatever';

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


    // multipick date picker:
// //

    var _this = this;
    this.activeDate = null;

    // this.selectedDates = [new Date().setHours(0, 0, 0, 0)];
    this.selectedDates = [];
    if (this.activeDate = null) {
      this.selectedDates.push(new Date().setHours(0, 0, 0, 0));
    }
    this.type = 'individual';
    this.options = {
    //   startingDay: 1,
    //   minDate: new Date(),
      customClass: function(data) {
        if (_this.selectedDates.indexOf(data.date.setHours(0, 0, 0, 0)) > -1 && _this.selectedDates.length <= 3) {
          return 'selected';
        }
        return '';
      }
    };

    this.show2pickers = false;

    this.removeFromSelected = function(dt) {
      _this.selectedDates.splice(_this.selectedDates.indexOf(dt), 1);
    // / Need to change activeDate for datepicker to call customClass again
      _this.activeDate = dt;
    };

  }
  ]
  );
};
