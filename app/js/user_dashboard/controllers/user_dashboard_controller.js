module.exports = exports = function(app) {
  app.controller('UserDashboardController', ['$http', function($http) {


    this.user_id = JSON.parse(localStorage.getItem('user_id'));
    this.arr = [];
    this.service_requests = JSON.parse(localStorage.getItem('service_requests'));

    this.service_request_object = this.service_requests[0];
    console.log(this.service_request_object);
    this.service_request_id = JSON.parse(localStorage.getItem('service_request_id'));

    this.url = 'https://wrenchroverapi.herokuapp.com/';
    this.userObject = {};
    this.sq_object = [];
    this.sq_id = null;
    this.sr_id = null;
    this.service_quotes = [];
    this.service_quotes_table = [];
    this.serviceQuotes = {
      user_id: this.user_id,
      quote_cost: '',
      quote_text: '',
      work_request: '',
      existence: 'maybe'
    };

    // this.arr.push(this.serviceQuotes);
    console.log(this.arr);
    this.errors = [];

    this.bothFunctions = function() {
      console.log('getting both functions');
      this.getUserInfo().then(() => {
        console.log(this.sq_d);
        this.getQuoteInfo();
      });

    };

    this.logUser = function() {
      console.log('user object from controller');

      console.log(this.serviceQuotes);

    };

    console.log(this.arr);

    // /////
    this.getUserInfo = function() {
      $http.get(this.url + 'users/' + this.user_id)
      .then((res) => {
        console.log(res.data);
        this.userObject = res.data;
        console.log(res.data.service_requests[0].id);
        this.sr_id = res.data.service_requests[0].id;
        console.log(this.sr_id);
      })
      .then(() => {
        console.log(this.sr_id);
        $http.get(this.url + 'service_requests/' + this.sr_id)
        .then((res) => {
          console.log(res.data);
          console.log(res.data.service_quotes.length);
          console.log(res.data.service_quotes);
          if (res.data.service_quotes.length >= 1) {
            console.log(res.data.service_quotes[0].id);
            this.arr = res.data;
            console.log(this.arr);

            this.service_quotes = res.data.service_quotes;

            console.log(this.service_quotes);


            $http.get(this.url + 'service_quotes')

            .then((res) => {
              console.log(res.data[0]);

              this.service_quotes_table.splice(0);
              for (var i = 0; i < res.data.length; i++) {
                if (res.data[i].service_request_id == this.service_request_id) {
                  console.log(res.data[i].service_request_id);
                  console.log(this.service_request_id);
                  this.service_quotes_table.push(res.data[i]);
                }
              }

              console.log(this.service_quotes_table);
              this.service_quotes_all = this.service_quotes.concat(this.service_quotes_table);
              console.log(this.service_quotes_all);
            });

          } else {
            console.log('nope');
          }
        });
      });
    };

    // ////


  }]);
};
