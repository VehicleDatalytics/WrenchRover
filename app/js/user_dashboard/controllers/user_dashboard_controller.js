 /* eslint-disable prefer-arrow-callback */
var baseUrl = require('../../config').baseUrl;
module.exports = exports = function(app) {
  app.controller('UserDashboardController', ['$http', 'NgMap', 'string', function($http, NgMap, string) {
  // app.controller('UserDashboardController', ['$http', 'string', function($http, string) {

    this.key = string;

    // console.log(this.googleMapsUrl);

    var vm = this;
    vm.positions = [];
    var loc_obj = {};

    var map_icons = [ '../../../images/map_icons/number_1.png',
      '../../../images/map_icons/number_2.png' ];


    NgMap.getMap().then(function(map) {
      console.log('stuffffffs');
      console.log('map', map);
      vm.map = map;
    });


    var that = this;
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

    console.log(this.arr);
    console.log(this.service_object_thing);
    // /////
    this.getUserInfo = function() {
      this.user_id = JSON.parse(localStorage.getItem('user_id'));
      console.log(this.service_object_thing);
      console.log(JSON.parse(localStorage.getItem('service_requests')));


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
              console.log(this.service_request_id);
              console.log(this.sr_id);
              this.obj_quote = this.service_quotes_table[0];
              for (var i = 0; i < res.data.length; i++) {
                if (res.data[i].service_request_id == this.sr_id) {
                //   vm.positions.splice(0);
                  console.log(res.data[i]);
                  var loc_obj = { id: res.data[i].service_center.service_name,
                    pos:

                     res.data[i].service_center.service_address + ', ' + res.data[i].service_center.service_city + ',' + res.data[i].service_center.service_state + ',' + res.data[i].service_center.service_zip, num: 'things',

                    position: res.data[i].service_center.service_address + ', ' + res.data[i].service_center.service_city + ',' + res.data[i].service_center.service_state + ',' + res.data[i].service_center.service_zip

                  };

                  vm.positions.push(loc_obj);


                  console.log(vm.positions);

                  this.avail_dates.push(res.data[i].available_date_1, res.data[i].available_date_2, res.data[i].available_date_3);

                  this.service_quotes_table.push(res.data[i]);
                //   return loc_obj;
                }
              }
              console.log(loc_obj);
              for (var j = 0; j < vm.positions.length; j++) {
                vm.positions[j].map_icon_pics = map_icons[j];
              }

              console.log(vm.positions);

              console.log(vm.positions);
              console.log(vm.positions.length);

              vm.shop = vm.positions[0];
              console.log(vm.shop);

              vm.showDetail = function(e, shop) {
                console.log(shop);
                console.log(shop.id);
                vm.shop = shop;
                vm.map.showInfoWindow('foo-iw', shop.id);
                console.log(vm.map);
              };

              vm.hideDetail = function() {
                vm.map.hideInfoWindow('foo-iw');
              };

              console.log(this.service_quotes_table);

              that.value = '';
              that.newValue = function(value, x) {
                console.log(value);
                // console.log(this.x);
                console.log(x);
              };

              this.service_quotes_all = this.service_quotes.concat(this.service_quotes_table);
              console.log(this.service_quotes_all);
              this.confirm = function(value, x, y) {
                console.log(value);
                console.log(x);
                console.log(y);
                this.sq_obj = y;
                this.sq_obj.accepted = value;
                console.log(this.sq_obj);
                console.log(this.sq_obj.id);
                console.log(window.localStorage.token);
                $http.put(this.url + 'service_quotes/' + this.sq_obj.id, this.sq_obj)

                .success((res) => {

                  console.log(res);
                });
              };

            });

          } else {
            console.log('nope');
          }
        });
      });
    };

  }]);
};
