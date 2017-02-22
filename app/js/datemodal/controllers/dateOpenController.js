
module.exports = function(app) {
  app.controller('dateOpenController', ['$uibModal', 'modalService', function($uibModal, modalService ) {
    console.log('date open controller');

    var d = new Date();
    this.month = d.getMonth();
    this._date = d.getDate();
    // console.log($uibModal);

    this.modalService = modalService;

    this.pickDate = function(value) {

      modalService.date = value;
      modalService.month = this.month + 1;
      modalService.today = this._date;
      var month = modalService.month;
      var today = modalService.today;

      modalService.addDate(value, month, today);
    };

    this.openTimes = function(parentSelector) {

      this.modalObj = {
        templateUrl: 'templates/datemodal/directives/times_open.html',
        controller: 'compController',
        controllerAs: 'vm'
      };

      var modalInstance = $uibModal.open(this.modalObj);

      this.pass = function(modalInstance) {
        modalService.pass(modalInstance);
      };
      console.log(this.modalObj);

      this.pass(modalInstance);

    };

    this.openCalendar = function() {
      this.modalObj = {
        templateUrl: 'templates/datemodal/directives/calendar_open.html',
        controller: 'compController',
        controllerAs: 'vm'
      };

      var modalInstance = $uibModal.open(this.modalObj);
      this.pass = function(modalInstance) {
        modalService.pass(modalInstance);
      };
      console.log(this.modalObj);

      this.pass(modalInstance);


    };

    this.closeModal = function() {
      console.log('date controller closing');
    //   console.log(modalService.instance);


      modalService.instance.close();
    };


  }]);
};
