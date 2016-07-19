const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/../app'));


module.exports = exports = app.listen(port, () => {
  console.log('server up on ' + port);

});
