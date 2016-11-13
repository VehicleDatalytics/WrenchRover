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
            console.log(x, y);


            this.quote_X = y;
            this.quote_X.user_id = x;
            // console.log(this.quote_X.availible_X.toTimeString());
            console.log(this.quote_X.time_one.toLocaleTimeString());

            this.quote_X.availible_dates = this.quote_X.date_one.toLocaleDateString() + ' at ' + this.quote_X.time_one.toLocaleTimeString();
            console.log(this.quote_X.availible_dates);

            this.quote_X.service_center_id = JSON.parse(localStorage.getItem('service_center_id'));
            this.quote_X.service_request_id = z;
            console.log(this.quote_X);
            $http.post(baseUrl + 'service_quotes', this.quote_X).
            success((config) => {
              console.log(config);
            });


          }
        };
      }]);

    };
