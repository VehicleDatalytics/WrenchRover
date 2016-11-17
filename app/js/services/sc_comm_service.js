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
            console.log(this.time_three);
            this.quote_X.dateArr = [];

            this.quote_X.dateArr.splice(0);

            if (this.quote_X.date_one && this.quote_X.time_one) {
              this.quote_X.available_date_1 = this.quote_X.date_one.toLocaleDateString() + ' at ' + this.quote_X.time_one.toLocaleTimeString();
            //   console.log(this.quote_X.avail_one);
            //   this.quote_X.dateArr.push(this.quote_X.avail_one);
              console.log('one');
            }

            if (this.quote_X.date_two && this.quote_X.time_two) {
              this.quote_X.available_date_2 = this.quote_X.date_two.toLocaleDateString() + ' at ' + this.quote_X.time_two.toLocaleTimeString();
            //   console.log(this.quote_X.avail_two);
              console.log('two');
            //   this.quote_X.dateArr.push(this.quote_X.avail_two);
            }

            if (this.quote_X.date_three && this.quote_X.time_three) {
              this.quote_X.available_date_3 = this.quote_X.date_three.toLocaleDateString() + ' at ' + this.quote_X.time_three.toLocaleTimeString();
              console.log(this.quote_X.avail_three);
              console.log('three');
            //   this.quote_X.dateArr.push(this.quote_X.avail_three);
            }


            // console.log(this.quote_X.available_dates);

            // console.log(this.quote_X.dateArr);
            // this.quote_X.availible_dates = this.quote_X.availible_dateArr.toString();
            // this.quote_X.availible_dates =
            // this.quote_X.dateArr.toString();


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
