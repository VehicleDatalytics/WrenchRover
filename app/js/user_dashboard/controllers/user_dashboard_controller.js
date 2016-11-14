module.exports = exports = function(app) {
  app.controller('UserDashboardController', ['$http', function($http) {


    this.user_id = JSON.parse(localStorage.getItem('user_id'));
    console.log(this.user_id);
    this.arr = [];

    this.service_object_thing = null;
    this.service_requestObj = JSON.parse(localStorage.getItem('service_requests'));

    console.log(this.service_requestObj);
    this.service_request_id = JSON.parse(localStorage.getItem('service_request_id'));
    console.log(this.service_request_id);

    this.url = 'https://wrenchroverapi.herokuapp.com/';
    this.userObject = {};
    this.sq_object = [];
    this.sq_id = null;
    this.sr_id = null;
    this.service_quotes = [];
    this.service_quotes_table = [];
    this.avail_dates = [];
    this.serviceQuotes = {
      user_id: this.user_id,
      quote_cost: '',
      quote_text: '',
      work_request: '',
      existence: 'maybe'
    };


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

      console.log(this.serviceQuotes);

    };

    console.log(this.arr);
    console.log(this.service_object_thing);
    // /////
    this.getUserInfo = function() {
      console.log(this.service_object_thing);
      console.log(JSON.parse(localStorage.getItem('service_requests')));

    //   this.previouslyEntered = localStorage.getItem('describeIssue');
    //   console.log(this.previouslyEntered);


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
          this.service_object_thing = res.data;
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
              console.log(res.data);
              this.service_quotes_table.splice(0);
              for (var i = 0; i < res.data.length; i++) {
                if (res.data[i].service_request_id == this.service_request_id) {

                  console.log(res.data[i].service_request_id);
                  console.log(this.service_request_id);
                  console.log(res.data[i].availible_dates);


                  this.avail_dates.push(res.data[i].availible_dates);
                  console.log(this.avail_dates);

                  var values = this.avail_dates[0].toString();
                  console.log(values);
                  var option_1 = values.split(',');
                  console.log(option_1);
                  console.log(option_1[0]);
                  res.data[i].option_1 = option_1[0];
                  res.data[i].option_2 = option_1[1];
                  res.data[i].option_3 = option_1[2];

                  this.service_quotes_table.push(res.data[i]);
                  console.log(this.service_quotes_table);
                }


              }

              this.service_quotes_all = this.service_quotes.concat(this.service_quotes_table);
              console.log(this.service_quotes_all);
            });

          } else {
            console.log('nope');
          }
        });
      });
    };

  }]);
};
