
var baseUrl = require('../../config').baseUrl;

module.exports = function(app) {
  app.controller('describeController', ['cmService', '$http', function( cmService, $http) {
    this.descriptions = [];
    this.childrens = [];
    this.errors = [];
    this.checked = null;
    this.oils = [];
    this.service = cmService;
    this.selection = null;


    $http.get(baseUrl + 'categories')
    .then((res) => {
      this.descriptions = res.data;

      for (var i = 0; i < res.data[0].children.length; i++) {
        if (res.data[0].children[i].name != 'Oil Change') {
          this.childrens.push(res.data[0].children[i]);
        }
        else {
          this.oils.push(res.data[0].children[i]);
        }
      }

    });

    this.oilSelected = function(x, y) {
      var value = this.value;
      cmService.oilSelected(value, y);
    };

    this.checkedSelected = function(x, y) {
      var value = this.value;
      cmService.checkedSelected(value, y);
    };

  }]);
};
