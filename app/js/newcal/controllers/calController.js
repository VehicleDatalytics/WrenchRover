module.exports = function(app) {
  app.controller('calController', ['modalService', function(modalService) {
    console.log('cal controlelr');
    this.modalService = modalService;
    this.closeModal = function() {
      console.log(' cal controll closing');


      this.modalService.instance.close();

    };


    this.week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    this.tempArr = [1, 2, 3, 4];

    // this.message = 'hiiiiii';
    if (this.modalService.apptArr >= 3) {
      this.message = 'thank you for choosing 3 dates.';
    }

    this.available_appts = modalService.apptArr;
    console.log(this.available_appts);
    this.firstPart = [];
    this.secondPart = [];
    this.fPart = [];
    this.nextPart = [];

    this.nextWeek = [];
    this.nextWeek1 = [];
    this.nextWeek2 = [];


    this.currentWeek = [];
    var d = new Date();
    this._month = d.getMonth();

    this._day = d.getDay();
    this._date = d.getDate();
    this._today = this.week[this._day];

    this._year = d.getFullYear();


    var _length = 7 - this._day;


       //  console.log('_legnth = ' + _length);


// 30,31,february//:


    this.getMonthEnd = function(value) {
      var mo;
      if (value === 8 || value === 3 || value === 5 || value === 10 ) {
        mo = 30;
      } else if (value === 0 || value === 2 || value === 4 || value === 6 || value === 9 || value === 12 || value === 7) {
        mo = 31;
      } else if (value == 1 && this._year % 4 == 0) {
        mo = 29;
      } else {
        mo = 28;
      }

      function x(value) {
        modalService.getMonthEnd(value);
      }
      x(mo);
      return mo;
    };

// first part of the week: start

    this.startingPoint = function() {
      var direction;
      if (this._date <= this._day + 1 && this._day != 0) {

               //  console.log('start if ');

        var limit = this._day - this._date;
        var x = this.getMonthEnd(this._month);


        for (var i = this._date; i >= 1; i--) {
          this.firstPart.unshift(i);

        }

        for (var i = x; i >= x - limit; i--) {
          this.nextPart.unshift(i);
        }

        this.fPart = this.nextPart.concat(this.firstPart);
               //  console.log('starting 1 = ' + this.fPart.length);
        direction = this.fPart;

      } else {
               //  console.log('else first');
        if (this._day == 0) {
                   //  console.log('else if');

                   //  this.firstPart;
          this.firstPart.push(this._date);
        } else {
                   //  console.log('yes');
          for (var i = this._day; i >= 0; i--) {
            this.firstPart.push(this._date - i);
                       //  console.log(this._date - i);

          }
        }
               //  console.log('starting 2 = ' + this.firstPart.length);
        direction = this.firstPart;
      }


      return direction;
    };

       //  this.startingPoint();
    this.firstWeek = this.startingPoint();
    // console.log(this.firstWeek);
// end first part// true

    for (var i = 1; i < _length; i++) {
           //  console.log('length now =' + _length);
      if (this._date + i <= this.getMonthEnd(this._month)) {
        this.secondPart.push(this._date + i);

      } else {

        i = 0;


        if (this._date == this.getMonthEnd(this._month)) {
          this._dateX = 1;

          _length = 6 - this._day;
        } else if (this._date == this.getMonthEnd(this._month) - 1) {
          this._dateX = 1;
          _length = 5 - this._day;

        } else {
          this._dateX = 1;

          _length = 6 - this.secondPart.length;
        }


        this.secondPart.push(this._dateX + i);

      }
    }
// here
    // console.log(this.secondPart);
    // console.log(this.firstWeek);
    this.fPart = this.firstWeek.concat(this.secondPart);

       //  console.log('second part length : ' + this.secondPart.length);


       //  console.log(this.fPart);
    var secondStartDate = this.fPart[6] + 7;
       //  console.log(secondStartDate);
//
// // next week:
    for (var i = this.fPart[6] + 1; i <= secondStartDate; i++) {
      if (i <= this.getMonthEnd(this._month)) {
        this.nextWeek1.push(i);

      } else {
        i = 0;
        secondStartDate = 7 - this.nextWeek1.length;

      }
    }


    this.nextWeek = this.nextWeek1.concat(this.nextWeek2);


    this.remove = function(value) {
      console.log(value);
      this.available_appts.splice(this.available_appts.indexOf(value), 1);

    };
// ///////


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


// ///////


  }
  ]);
};
