module.exports = function(app) {
  app.factory('modalService', () => {

    this.instance = 'dddd';
    return {
      instance: this.instance,
      pass: function(x) {
        // console.log(x.close);
        this.instance = x;
        console.log(this.instance);
        return this.instance;
      }
    };
  });

};
