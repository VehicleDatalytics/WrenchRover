module.exports = function(app) {
  app.controller('calController', function() {
       // this.monthArr = [1,2,3,4,5,6,7,8,9,10,11,12];

    this.week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];


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
       //  this._date = 15;
    this._date = 28;
    this._year = d.getFullYear();
    this._day = 6;
    this._month = 1;

    var _length = 7 - this._day;


    console.log('_legnth = ' + _length);


// 30,31,february//:
    this.getMonthEnd = function(value) {
           //  console.log(value);
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
      return mo;
    };

// first part of the week: start

    this.startingPoint = function() {
      var direction;
      if (this._date <= this._day + 1 && this._day != 0) {

        console.log('start if ');

        var limit = this._day - this._date;
        var x = this.getMonthEnd(this._month);

        for (var i = this._date; i >= 1; i--) {
          this.firstPart.unshift(i);

        }

        for (var i = x; i >= x - limit; i--) {
          this.nextPart.unshift(i);
        }

        this.fPart = this.nextPart.concat(this.firstPart);
        console.log('starting 1 = ' + this.fPart.length);
        direction = this.fPart;

      } else {
        console.log('else first');
        if (this._day == 0) {
          console.log('else if');

                   //  this.firstPart;
          this.firstPart.push(this._date);
        } else {
          console.log('yes');
          for (var i = this._day; i >= 0; i--) {
            this.firstPart.push(this._date - i);
            console.log(this._date - i);

          }
        }
        console.log('starting 2 = ' + this.firstPart.length);
        direction = this.firstPart;
      }


      return direction;
    };

       //  this.startingPoint();
    this.firstWeek = this.startingPoint();
    console.log(this.firstWeek);
// end first part// true

    for (var i = 1; i < _length; i++) {
      console.log('length now =' + _length);
      if (this._date + i <= this.getMonthEnd(this._month)) {
        this.secondPart.push(this._date + i);

        console.log('second 1');
      } else {
               //  this._date =1;
        i = 0;
               //  log;

        if (this._date == this.getMonthEnd(this._month)) {
          this._date = 1;
          console.log('rock');
          _length = 6 - this._day;
        } else if (this._date == this.getMonthEnd(this._month) - 1) {
          this._date = 1;
          _length = 5 - this._day;

        } else {
          this._date = 1;
          console.log('roll');
          _length = 6 - this.secondPart.length;
        }


        this.secondPart.push(this._date + i);
        console.log('seoncd 2');
      }
    }
// here
    console.log(this.secondPart);
    console.log(this.firstWeek);
    this.fPart = this.firstWeek.concat(this.secondPart);

    console.log('second part length : ' + this.secondPart.length);


    console.log(this.fPart);
    var secondStartDate = this.fPart[6] + 7;
    console.log(secondStartDate);
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

//
    this.nextWeek = this.nextWeek1.concat(this.nextWeek2);
//
//
//          this.pick = function(a){
//              console.log(a);
//          };
//
//
//
  });
};
