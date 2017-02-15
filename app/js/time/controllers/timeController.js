module.exports = function(app) {
  app.controller('timeController', ['modalService', function(modalService) {


    this.service = modalService;
    this.closeModal = function() {
      modalService.instance.close();
    };


    this.times = [
      {
        colA: '09:00',
        colB: '12:00',
        colC: '03:00'
      },
      {
        colA: '09:30',
        colB: '12:30',
        colC: '03:30'
      },
      {
        colA: '10:00',
        colB: '01:00',
        colC: '04:00'
      },
      {
        colA: '10:30',
        colB: '01:30',
        colC: '04:30'
      },
      {
        colA: '11:00',
        colB: '02:00',
        colC: '05:00'
      },
      {
        colA: '11:30',
        colB: '02:30',
        colC: '05:30'
      }


    ];


    this.pickTimes = function(value) {
      console.log(value);
      modalService.pickTimes(value);

    };

  }]);};
