var port = process.env.PORT;

if (port === 5553) {
  module.exports = {
    baseUrl: 'localhost:' + port
  };
} else {
  module.exports = {
    baseUrl: 'wrenchroverapi.herokuapp.com/'
  };
}
