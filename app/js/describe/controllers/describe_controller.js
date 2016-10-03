
var baseUrl = require('../../config').baseUrl;

module.exports = function(app) {
  app.controller('describeController', ['$http', function($http) {
    this.descriptions = [];
    this.childrens = [];

    this.errors = [];
    this.selection = [];
    this.checked = null;
    // this.stored = [];


    $http.get(baseUrl + 'categories')
    .then((res) => {
      this.descriptions = res.data;
      this.childrens = res.data[0].children;

      console.log(this.descriptions);
      console.log(this.childrens);

    });

    this.storeSelection = function() {
      console.log('storing the selection');
      window.localStorage.checked = 'bob';
      console.log(this.x);
    };

    this.checkedSelected = function() {
      this.stored = [];
      console.log('checked selected');
      console.log(this.value);
      this.stored.push(this.value);
      window.localStorage.checked = this.stored;
      console.log(this.stored);
      return true;
    };


  }]);
};
