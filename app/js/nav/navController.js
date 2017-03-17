
module.exports = function(app) {
  app.controller('navController', [function() {
    var that = this;
    console.log('navbaring');
    // this.isNavCollapsed = true;
    this.checkcookies = function() {
      console.log('initting cookie check');
      console.log(navigator.cookieEnabled);
    };

    this.serviceCenter = false;
    // this.activeButton = function() {
    //   this.serviceCenter = !this.serviceCenter;
    // };
    this.items = ['Coffee', 'Tea', 'Red Bull'];
    this.status = {
      isopen: true

    };
    this.myFunc = function() {
      console.log('clicked the thing');
    };

    // this.status = {
    //   isopen: false
    // };
    this.toggled = function(open) {

      console.log('Dropdown is now: ', 'something');

    };


    this.toggleDropdown = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      that.status.isopen = !that.status.isopen;
    };

  }]);
};
