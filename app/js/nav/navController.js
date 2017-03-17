
module.exports = function(app) {
  app.controller('navController', ['modalService', function(modalService) {
    var that = this;
    console.log('navbaring');
    // this.isNavCollapsed = true;
    this.checkcookies = function() {
      console.log('initting cookie check');
      console.log(navigator.cookieEnabled);
    };
    this.service = modalService;

    this.serviceCenter = false;
    // this.activeButton = function() {
    //   this.serviceCenter = !this.serviceCenter;
    // };
    this.items = ['Coffee', 'Tea', 'Red Bull'];
    this.status = {
      isopen: true

    };


    this.toggled = function(open) {

      console.log('Dropdown is now: ', open);

    };


    this.toggleDropdown = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
    //   this.status.isopen = !this.status.isopen;
      that.status.isopen = !that.status.isopen;
    };

  }]);
};
