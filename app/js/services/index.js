module.exports = exports = function(app) {
  require('./handle_error')(app);
  require('./main_resource')(app);
};
