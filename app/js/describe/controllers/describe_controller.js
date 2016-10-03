
var baseUrl = require('../../config').baseUrl;

module.exports = function(app) {
  app.controller('describeController', ['$http', function($http) {
    this.descriptions = [];
    this.childrens = [];
    this.siblings = [];
    this.errors = [];
    this.selection = [];
    this.experiment = 'SHOWING UP';

    $http.get(baseUrl + 'categories')
    .then((res) => {
      this.descriptions = res.data;
      this.childrens = res.data[0].children;
    //   for (var i = 0; i < res.data[0].children.length; i++) {
    //     this.siblings.push(res.data[0].children[i]);
      //
    //   }


      console.log(this.descriptions);
      console.log(this.childrens);
      console.log(this.siblings);
    });


  }]);
};
