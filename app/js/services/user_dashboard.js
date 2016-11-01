module.exports = exports = function(app) {
  app.factory('userDashboardResource', ['$http', 'wrHandleError', function($http, errorHandler) {
    var dashboardResource = function(userObject, errors) {
      this.user = userObject;
      this.errorsArray = errors;
      this.userUrl = 'https://wrenchroverapi.herokuapp.com/users/';
      this.requestUrl = 'https://wrenchroverapi.herokuapp.com/service_requests/';
      this.quotesUrl = '';
    };

    dashboardResource.prototype.getUserInfo = function() {
      return $http.get(this.userUrl + this.user.id)
      .then( (res) => {
        this.user.userName = res.data.user_name;
        this.user.userEmail = res.data.user_email;
        this.user.userPhone = res.data.user_phone;
        this.user.userZip = res.data.user_zip;
        this.user.serviceRequests = res.data.service_requests;
        for (var i = 0; i < res.data.autos.length; i++) {
          this.user.autos.push(res.data.autos[i]);
        }
        this.user.memberSince = dashboardResource.calculateMemberDate(res);
      });
    };

    dashboardResource.calculateMemberDate = function(res) {
      var month = parseInt(res.data.created_at.slice(5, 7), 10);
      var year = res.data.created_at.slice(0, 4);
      var monthsArray = ['January', 'February', 'March', 'April', 'May',
                        'June', 'July', 'August', 'September', 'October',
                        'November', 'December'];
      var memberDate = monthsArray[month - 1] + ' ' + year;
      return memberDate;
    };

    // dashboardResource.getServiceRequestInfo = function(res) {
    //   var requestArray = res.data.service_requests;
    //   for (var i = 0; i < requestArray.length; i++) {
    //     var reqID = requestArray[i].id;
    //     return $http.get(this.requestUrl + reqID)
    //     .then( (res) => {
    //
    //     });
    //   }
    // };

    // dashboardResource.prototype.saveNewVehicleInfo = function() {
    // POST new vehicle object to database
    // };

    // dashboardResource.prototype.deleteVehicle = function() {
    // DELETE vehicle object from database
    // }

    // dashboardResource.prototype.getUserServiceQuotes = function() {
    //   return $http.get(this.quotesUrl + this.user.id)
    //   .then( (res) => {
    //     this.serviceQuotes = res.data;
    //   });
    // };

    return dashboardResource;
  }]);
};
