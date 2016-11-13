    var baseUrl = 'https://wrenchroverapi.herokuapp.com/';
    module.exports = function(app) {
      app.factory('scCommService', ['$http', function($http) {
        this.quoteObj = {
          user_id: null,
          quote: null

        };

        return {
          createQuote: function(x, y, z, a) {
            this.quoteObj = x;
            console.log('just weeping');
            console.log(x, y);


            this.quote_X = y;
            this.quote_X.user_id = x;

            this.quote_X.service_center_id = JSON.parse(localStorage.getItem('service_center_id'));
            this.quote_X.service_request_id = z;
            // this.quote_X.quote_text = a;
            // this.quote_X.service_center_id = 17;
            console.log(this.quote_X);
            $http.post(baseUrl + 'service_quotes', this.quote_X).
            success((config) => {
              console.log(config);
            });


          }
        };
      }]);

    };
