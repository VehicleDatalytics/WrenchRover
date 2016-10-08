
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
    this.example = 'word up';
    this.previouslyEntered = localStorage.getItem('describeIssue');
    var that = this;
    that.value = this.value;
    this.placeholder = "Tell us what's happening with your car.";
    this.button = 'Enter';
    this.button = that.button;
    this.dashArr2 = [];
    // this.dash = '../../../images/dashlights/001.png';
    this.dash = {
      one: '../../../images/dashlights/001.png',
      two: '../../../images/dashlights/002.png',
      three: '../../../images/dashlights/003.png',
      four: '../../../images/dashlights/004.png',
      five: '../../../images/dashlights/005.png',
      ten: '../../../images/dashlights/010.png',
      eleven: '../../../images/dashlights/011.png',
      fifteen: '../../../images/dashlights/015.png',
      sixteen: '../../../images/dashlights/016.png',
      seventeen: '../../../images/dashlights/017.png'
    };
    this.dashArr = ['../../../images/dashlights/001.png', '../../../images/dashlights/002.png', '../../../images/dashlights/003.png', '../../../images/dashlights/004.png', '../../../images/dashlights/005.png', '../../../images/dashlights/010.png', '../../../images/dashlights/011.png', '../../../images/dashlights/015.png', '../../../images/dashlights/016.png', '../../../images/dashlights/017.png'];

    this.dashArr2.push(this.dash);

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

    this.textAreaFunc = function(x) {
      console.log(this.value);
      var value = this.value;
      this.value = 'Thank you';

      cmService.textAreaFunc(value);
    };

    this.editThis = function() {
      var value = '';
      this.placeholder = 'hello friend';
      this.textAreaFunc();
    };

    this.changeText = function() {

      that.button = 'x';
    };

    this.dashSelect = function() {
      console.log('yes');
    };

  }]);
};
