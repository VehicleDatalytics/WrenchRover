
module.exports = function(app) {
  app.controller('megaController', ['modalService', function(modalService) {
    console.log('mega naving');
    this.book = "ike's bluff";
    this.service = modalService;
  }]);
};
