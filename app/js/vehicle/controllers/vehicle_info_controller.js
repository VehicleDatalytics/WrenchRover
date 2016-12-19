
var baseUrl = require('../../config').baseUrl;
module.exports = exports = function(app) {
  app.controller('VehicleInfoController', ['edmundsVehicleListResource', 'vicClearSelections', '$state', '$http', function(Resource, ClearSelections, $state, $http) {
    this.cookies = navigator.cookieEnabled;
    this.vehicleObject = {
      year: 0,
      make: '',
      model: '',
      trim: '',
      engine: '',
      miles: '',
      vin: ''
    };
    this.vehicleListOptions = {
      yearsList: [1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000,
        2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011,
        2012, 2013, 2014, 2015, 2016],
      makeList: [],
      modelList: [],
      trimList: [],
      engineList: []
    };
    this.errors = [];

    var resource = new Resource(this.vehicleObject, this.vehicleListOptions, this.errors);
    var clearSelections = new ClearSelections(this.vehicleObject, this.vehicleListOptions, this.errors);

    this.getVehicleMakes = resource.getVehicleMakes.bind(resource);
    this.getVehicleModels = resource.getVehicleModels.bind(resource);
    this.getVehicleTrims = resource.getVehicleTrims.bind(resource);
    this.getVehicleEngines = resource.getVehicleEngines.bind(resource);
    this.getVin = resource.getVin.bind(resource);

    this.newYearSelected = clearSelections.newYearSelected.bind(clearSelections);
    this.newMakeSelected = clearSelections.newMakeSelected.bind(clearSelections);
    this.newModelSelected = clearSelections.newModelSelected.bind(clearSelections);
    this.newTrimSelected = clearSelections.newTrimSelected.bind(clearSelections);

    this.saveToLocalStorage = function() {
      console.log('save to local');
      window.localStorage.vehicle = JSON.stringify(this.vehicleObject);
      console.log(this.vehicleObject);


      if (localStorage.getItem('token')) {
        console.log('there is a token');

        this.auto = {
          year: this.vehicleObject.year,
          make: this.vehicleObject.make.name,
          model: this.vehicleObject.model.name,
          trim: this.vehicleObject.trim.name,
          engine: this.vehicleObject.engine,
          mileage: this.vehicleObject.mileage,
          user_id: localStorage.getItem('user_id'),
          service_request_id: null
        };
        $http.post(baseUrl + 'autos', this.auto)
        .success( (config) => {
          console.log(config);
        });
        $state.go('user_dashboard');
      } else {
        console.log('there is not a token');
        $state.go('common_repairs_view.get_started');
      }

    };

    this.logVehicle = function() {
      console.log(this.vehicleObject);
    };

    this.showMe = function(id) {
      document.getElementById(id).disabled = false;
    };

    this.disableMe = function(id) {
      document.getElementById(id).disabled = true;
    };

    this.fillOutDropdown = function() {
      document.getElementById('b').disabled = false;
      document.getElementById('b').text = this.vehicleObject.make;
    };
  }]);
};
