module.exports = function(app) {
  app.factory('cmService', [function() {

    this.chosenService = null;
    var chosen = [];
    this.chosen = chosen;
    var that = this;
    return {


    //   checkedSelected: function(value) {
    //     this.chosenService = value;
    //     chosen.push(value);
    //     console.log(that.chosen);
    //     this.chosen = that.chosen;
    //     console.log(chosen.length);
    //   }

      checkedSelected: function(value, second) {

        this.chosenService = second;
        if (value) {
          chosen.push(second);
          console.log('value!');
        }
        else {
          var index = chosen.indexOf(second);
          console.log('no value!');
          chosen.splice(index);
        }
        this.chosen = that.chosen;
      }

    };
  }]);

};
