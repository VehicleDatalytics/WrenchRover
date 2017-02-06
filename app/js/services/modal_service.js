module.exports = function(app) {
  app.factory('modalService', () => {

    this.instance = 'instance';
    return {
      instance: this.instance,
      pass: function(x) {
        this.instance = x;
        return this.instance;
      }
    };
  });

};
