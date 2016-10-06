module.exports = function(app) {
  app.factory('cmService', [function() {

    this.chosenService = null;
    var chosen = [];
    this.chosen = chosen;
    var that = this;
    return {

      checkedSelected: function(value) {
        console.log(value);
        this.chosenService = value;
        chosen.push(value);
        console.log(chosen);
        console.log(that.chosen);
        // console.log(this.chosen);
        this.chosen = that.chosen;
        console.log(this.chosen);
        console.log(chosen.length);
      }

    };
  }]);

};
