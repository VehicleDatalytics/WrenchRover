module.exports = function(app) {
  app.factory('cmService', [function() {

    this.chosenService = null;
    var chosen = [];
    this.chosen = chosen;
    var oilChosen = [];
    this.oilChosen = oilChosen;
    var that = this;
    this.count = 0;
    this.textInput = null;
    // this.button = 'enter';


    console.log(this.count);

    // this.example = 'word up';
    return {
      oilSelected: function(value, second) {
        this.chosenService = second;
        if (value && that.count === 0) {
          that.count = 5;
          oilChosen.push(second);
          console.log('oil value!');
          console.log(that.count);

        }
        else {
          that.count = 0;
          var index = oilChosen.indexOf(second);
          console.log('no oil value!');
          oilChosen.splice(index);
          console.log(that.count);

        }
        this.count = that.count;
        this.oilChosen = that.oilChosen;
      },


      checkedSelected: function(value, second) {

        this.chosenService = second;
        if (value) {
          chosen.push(second);
          console.log('value!');
        }
        else {
          var index = chosen.indexOf(second);
          console.log('no value!');
          console.log(index);
          chosen.splice(index, 1);
        }
        this.chosen = that.chosen;
        window.localStorage.chosen = this.chosen;
      },

      textAreaFunc: function(value) {
        this.textInput = value;
        if (value === undefined) {
          window.localStorage.removeItem('describeIssue');

        }
        else {
          window.localStorage.describeIssue = this.textInput;
          window.localStorage.example = 'foo bar';

        }
      },

      changeText: function() {
        // this.button = 'update';
      }


    };
  }]);

};
