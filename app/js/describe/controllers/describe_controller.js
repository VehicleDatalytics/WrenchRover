
var baseUrl = require('../../config').baseUrl;

module.exports = function(app) {
  app.controller('describeController', ['$http', function($http) {
    this.descriptions = [];
    this.childrens = [];

    this.errors = [];
    this.selection = [];
    this.checked = null;
    this.oils = [];


    $http.get(baseUrl + 'categories')
    .then((res) => {
      this.descriptions = res.data;
    //   this.childrens = res.data[0].children;

      for (var i = 0; i < res.data[0].children.length; i++) {
        if (res.data[0].children[i].name != 'Oil Change') {
          this.childrens.push(res.data[0].children[i]);
        }
        else {
          console.log('oil out');
          this.oils.push(res.data[0].children[i]);
          console.log(this.oils);
        }
      }

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
