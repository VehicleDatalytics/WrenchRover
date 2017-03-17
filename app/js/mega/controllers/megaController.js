
module.exports = function(app) {
  app.controller('megaController', [function() {
    console.log('mega naving');
    this.book = "ike's bluff";
  }]);
};
