module.exports = function(app) {
  app.factory('wrResource', ['$http', 'wrHandleError', function($http, handleError) {
    var Resource = function(resourceArr, errorsArr, baseUrl, options) {
      this.data = resourceArr;
      this.url = baseUrl;
      this.errors = errorsArr;
      this.options = options || {};
      this.options.errMessages = this.options.errMessages || {};
      console.log(this.data);
    };

    Resource.prototype.getAll = function() {
      return $http.get(this.url)
        .then((res) => {
        //   console.log(this.url);
          this.data.splice(0);
          for (var i = 0; i < res.data.length; i++) {
            this.data.push(res.data[i]);
          }
        }, handleError(this.errors, this.options.errMessages.getAll || 'could not fetch resource'));
    };


    Resource.prototype.getChildren = function() {
      console.log('getting children from main resource service');
      return $http.get(this.url)
        .then((res) => {
        //   console.log(this.url);
          this.data.splice(0);
          for (var i = 0; i < res.data.length; i++) {
            this.data.push(res.data[i].children);
          }
        }, handleError(this.errors, this.options.errMessages.getAll || 'could not fetch resource'));
    };


    Resource.prototype.getChildren0 = function() {
    //   console.log('getting children from main resource service');
      return $http.get(this.url)
        .then((res) => {
        //   console.log(this.url);
          this.data.splice(0);
          for (var i = 0; i < res.data[0].children.length; i++) {
            this.data.push(res.data[0].children[i]);
          }
        }, handleError(this.errors, this.options.errMessages.getAll || 'could not fetch resource'));
    };


    Resource.prototype.getChildren1 = function() {
    //   console.log('getting children from main resource service');
      return $http.get(this.url)
        .then((res) => {
        //   console.log(this.url);
          this.data.splice(0);
          for (var i = 0; i < res.data[0].children.length; i++) {
            this.data.push(res.data[0].children[i].children);
          }
        }, handleError(this.errors, this.options.errMessages.getAll || 'could not fetch resource'));
    };
    // Resource.prototype.getChildren0 = function() {
    // //   console.log('getting children from main resource service');
    //   return $http.get(this.url)
    //     .then((res) => {
    //     //   console.log(this.url);
    //       this.data.splice(0);
    //       for (var i = 0; i < res.data[0].children.length; i++) {
    //         this.data.push(res.data[0].children[i]);
    //       }
    //     }, handleError(this.errors, this.options.errMessages.getAll || 'could not fetch resource'));
    // };


    Resource.prototype.create = function(resource) {
      return $http.post(this.url, resource)
     .then((res) => {
       this.data.push(res.data);

     }, handleError(this.errors, this.options.errMessages.create || 'could not save resource'));
    };


    Resource.prototype.update = function(resource) {
      return $http.put(this.url + '/' + resource._id, resource)
  .catch( handleError(this.errors, this.options.errMessages.update || 'could not update resource'));
    };


    return Resource;
  }]);
};
