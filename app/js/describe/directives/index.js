module.exports = function(app) {
  require('./describe_issue.js')(app);
  require('./describe_list_item.js')(app);
  require('./common_maintenance.js')(app);
  require('./first_level_children.js')(app);
  require('./second_level_children.js')(app);
  require('./second_sibling.js')(app);
};
