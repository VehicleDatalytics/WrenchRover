
var baseUrl = require('../../config').baseUrl;

module.exports = function(app) {
  app.controller('describeController', ['wrResource', function(Resource) {
    this.descriptions = [];
    this.errors = [];
    var remote = new Resource(this.descriptions, this.errors, baseUrl + 'categories', { errMessages: { getAll: 'custome error message' } });
    this.getAll = remote.getAll.bind(remote);

    console.log(this.descriptions);
    this.getAll();
  }]);
};
