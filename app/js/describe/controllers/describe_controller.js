
var baseUrl = require('../../config').baseUrl;

module.exports = function(app) {
  app.controller('describeController', ['cmService', '$http', function( cmService, $http) {
    this.descriptions = [];
    this.childrens = [];
    this.errors = [];
    this.checked = null;
    this.oils = [];


    this.service = cmService;
    // this.afterSelected = cmService.afterSelected.bind(cmService);
    // this.isSelected = cmService.isSelected.bind(cmService);
    // this.checkedSelected = cmService.checkedSelected.bind(cmService);
    this.selection = null;
    this.v = null;

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


    this.checkedSelected = function() {
      var value = this.value;
      cmService.checkedSelected(value);
    };

  }]);
};
