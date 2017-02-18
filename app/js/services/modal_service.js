module.exports = function(app) {
  app.factory('modalService', () => {
    console.log('this instance');

    this.instance = 'instance';
    return {

      apptArr: [],
      dateArr: [],
      timesArr: [],
      instance: this.instance,
      d: new Date(),


      pass: function(x) {
        this.instance = x;
        return this.instance;
      },
      addDate: function(x, month, today) {
        console.log(month);
        console.log(today);

        console.log(this.mo);


        if (this.mo - 13 < today < this.mo && x <= 13) {
          console.log('yes');
          this.the_month = month + 1;
        } else {
          this.the_month = month;
        }


        console.log(x);
        this.dateArr.push(x);
        console.log(this.dateArr);
        return this.dateArr;
      },

      getMonthEnd: function(value) {
        console.log(value);
        return this.mo = value;

      },

      pickTimes: function(value) {

                // console.log(this.d);
                // console.log(this._month);
        console.log(this.the_month);

        console.log(this.date);
        this.timesArr.push(value);

        this.apptArr.push(this.the_month + '/' + this.date + ' at ' + value);
        console.log(this.apptArr);
        return this.apptArr;
      }


    };
  });

};
