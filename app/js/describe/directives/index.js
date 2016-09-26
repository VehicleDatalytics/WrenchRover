module.exports = function(app) {
  require('./describe_issue.js')(app);
  require('./describe_list_item.js')(app);
};
