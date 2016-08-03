module.exports = exports = function(app) {
  app.factory('vehicleInfoResource', ['$http', function($http) { // needs error handler
    const baseUrl = 'http.//localhost:3000'; // change url
    var Resource = function(vehicleObject, errorsArray, apiUrl) {
      this.vehicle = vehicleObject;
      this.errors = errorsArray;
      this.url = baseUrl + '/api/vehicleInfo/';
    };

    Resource.prototype.getVehicleMakes = function(year) {
      return $http.get(this.url + year)
      .then( (res) => {
        this.makes.splice(0);
        for (var i = 0; i < res.data.length; i++) {
          this.makes.push(res.data[i]);
        }
      }, errorHandler(this.errors, 'could not retrieve vehicle makes by year'));
    };
  }])
}
