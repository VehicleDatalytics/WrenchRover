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


            this.quote_X.avail_one = this.quote_X.date_one.toLocaleDateString() + ' at ' + this.quote_X.time_one.toLocaleTimeString();

            this.quote_X.avail_two = this.quote_X.date_two.toLocaleDateString() + ' at ' + this.quote_X.time_two.toLocaleTimeString();

            this.quote_X.avail_three = this.quote_X.date_three.toLocaleDateString() + ' at ' + this.quote_X.time_three.toLocaleTimeString();

            this.quote_X.availible_dateArr = [];

            console.log(this.quote_X.availible_dates);

            this.quote_X.availible_dateArr.push(this.quote_X.avail_one, this.quote_X.avail_two, this.quote_X.avail_three);
            // console.log(this.quote_X.availible_dates);

            this.quote_X.availible_dates = this.quote_X.availible_dateArr.toString();
            //
            // this.quote_X.availible_dates = JSON.stringify(this.quote_X.available_dateArr);

            // this.quote_X.availible_dates = this.quote_X.date_one.toLocaleDateString() + ' at ' + this.quote_X.time_one.toLocaleTimeString();
            // console.log(this.quote_X.availible_dates);

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
