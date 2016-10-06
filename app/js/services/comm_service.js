module.exports = function(app) {
  app.factory('cmService', [function() {

    this.chosenService = null;
    return {

      checkedSelected: function(value) {
        console.log(value);
        this.chosenService = value;
      }

    };
  }]);

};
