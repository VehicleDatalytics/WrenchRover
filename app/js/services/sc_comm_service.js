    var baseUrl = 'https://wrenchroverapi.herokuapp.com/';
    module.exports = function(app) {
      app.factory('scCommService', ['$http', function($http) {
        // this.quoteObj = {
        //   user_id: null,
        //   quote: null
        //
        // };
        //

        return {

          addDates: function(x) {
            console.log(x);
            console.log(x[0], x[1], x[2]);
            console.log('adding dates');
            for (var i = 0; i < x.length; i++) {
              console.log(new Date(x[i]));
            //   this.arr.push(new Date(x[i]));
            }

          },
          createQuote: function(x, y, z, a, times) {
            console.log(a);
            console.log(new Date(a[0]));
            console.log(times);

            this.quoteObj = x;
            console.log(x, y, z);


            this.quote_X = y;
            this.quote_X.user_id = x;
            this.quote_X.available_date_1 = new Date(a[0]).toLocaleDateString() + ' at ' + times[0];
            this.quote_X.available_date_2 = new Date(a[1]).toLocaleDateString() + ' at ' + times[1];
            this.quote_X.available_date_3 = new Date(a[2]).toLocaleDateString() + ' at ' + times[2];


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
