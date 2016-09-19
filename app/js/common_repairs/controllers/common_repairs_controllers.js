module.exports = function(app) {
  app.controller('ExampleController', [ function() {
    this.showMe = false;
    this.myFunc = function() {
      console.log('yes here it is');
      this.showMe = false;

    };


  }]);
};
