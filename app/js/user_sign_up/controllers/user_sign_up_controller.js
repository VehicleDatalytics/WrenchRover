var baseUrl = require('../../config').baseUrl;

module.exports = function(app) {
  app.controller('userSignUpController', ['wrResource', function(Resource) {
    this.users = [];
    this.errors = [];

    var remote = new Resource(this.users, this.errors, baseUrl + 'users', { errMessages: { create: 'create error' } });

    this.getAll = remote.getAll.bind(remote);

    this.createUser = function() {
      remote.create(this.newUser)
      .then(() => {
        console.log(this.newUser);
        this.newUser = null;
      });
    }.bind(this);
  }


]);
};
