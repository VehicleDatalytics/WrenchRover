const express = require('express');
const app = express();
const mysql = require('mysql');
const port = process.env.PORT || 3000;

// var connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'testRoverDB'
// });

// connection.connect(function(error) {
//     if (error) {
//         console.log('error');
//     }
//     else {
//         console.log('connected');
//     }
// });

// app.get('/', (req, res) => {
//     connection.query('SELECT * FROM testRoverTable', function(error, rows, fields) {
//         if (error) {
//             console.log('error in query');
//         }
//         else {
//             console.log(rows);
//         }
//     });
// });

app.use(express.static(__dirname + '/../build')).get('*', (req, res) => {
    res.redirect('/#' + req.url);
});

app.use('/*', (req, res) => {
    res.status(404).send('not found');
});


app.use((req, res, next) => {
res.header('Access-Control-Allow-Origin', '*');
res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, token');
res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
next();
});

module.exports = exports = app.listen(port, () => {
  console.log('server up on ' + port);

});
