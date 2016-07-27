var port = process.env.PORT;

if (port === 5555) {
  module.exports = {
    baseUrl: 'localhost:' + port
  };
} else {
  module.exports = {
    baseUrl: ''
  };
}
