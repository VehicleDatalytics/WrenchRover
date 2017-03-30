
module.exports = function(app) {
  app.controller('megaController', ['modalService', function(modalService) {
    console.log('mega naving');

    this.service = modalService;
    // this.indexNumberA = 0;
    // this.indexNumberB = 1;

    this.indexNumberA = modalService.indexNumberA;
    this.indexNumberB = modalService.indexNumberB;

    console.log(modalService.indexNumberA);
    console.log(this.indexNumberA);

  }]);
};
