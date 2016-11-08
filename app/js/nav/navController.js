
module.exports = function(app) {
  app.controller('navController', [function() {
    console.log('navbaring');
    this.isNavCollapsed = true;
    this.checkcookies = function() {
      console.log('initting cookie check');
      console.log(navigator.cookieEnabled);

    //   if (navigator.cookieEnabled) {
    //     alert('Cookies must be enabled to use this site');
    //   } else {
    //     alert('Cookies must be enabled to use this site');
    //   }
    };
  }]);
};
