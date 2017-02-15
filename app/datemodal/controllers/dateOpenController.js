
module.exports = function(app) {
  app.controller('dateOpenController', ['$uibModal', 'modalService', function($uibModal, modalService ) {

    var d = new Date();
    this.month = d.getMonth();
    this._date = d.getDate();


    this.service = modalService;


    this.pickDate = function(value) {

            // console.log(value);
      modalService.date = value;
      modalService.month = this.month + 1;
      modalService.today = this._date;
      var month = modalService.month;
      var today = modalService.today;

      modalService.addDate(value, month, today);
    };

    this.open = function(parentSelector) {

      this.modalObj = {
        templateUrl: 'templates/datemodal/directives/date_open.html',
        controller: 'compController',
        controllerAs: 'vm'
      };

      var modalInstance = $uibModal.open(this.modalObj);
      this.pass = function(modalInstance) {
        modalService.pass(modalInstance);
      };


      this.pass(modalInstance);

    };


  }]);
};
