    var baseUrl = 'https://wrenchroverapi.herokuapp.com/';
    module.exports = function(app) {
      app.factory('scCommService', ['$http', function($http) {


        return {


          createQuote: function(x, y, z) {
            // x = sc_user_id;
            // y = scquote = text, price;
            // z = apptarray;


            this.quoteObj = x;
            console.log(x, y, z);


            this.quote_X = y;
            this.quote_X.user_id = x;


            //
            // this.quote_X.available_date_1 = trimTheDate(a[0], 0) + ' at ' + times[0];
            //
            //
            // this.quote_X.available_date_2 = trimTheDate(a[1], 1) + ' at ' + times[1];
            //
            //
            // this.quote_X.available_date_3 = trimTheDate(a[2], 2) + ' at ' + times[2];


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
