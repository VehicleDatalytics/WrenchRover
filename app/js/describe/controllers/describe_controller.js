
var baseUrl = require('../../config').baseUrl;

module.exports = function(app) {
  app.controller('describeController', ['cmService', '$http', function( cmService, $http) {
    this.descriptions = [];
    this.childrens = [];
    this.errors = [];
    this.checked = null;
    this.oils = [];
    // var chosen = [];
    this.service = cmService;
    this.selection = null;
    // this.chosen = chosen;
    // var that = this;


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


    this.checkedSelected = function(x) {
    //   console.log(chosen);
    //   console.log(that.chosen);
    //   chosen.push(x);
    //   console.log(chosen.length);
      console.log(x);

    //   chosen.push(x);


      var value = this.value;
      cmService.checkedSelected(value);

    };


  }]);
};
