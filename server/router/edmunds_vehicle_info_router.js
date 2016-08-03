const Router = require('express').Router;
const request = require('superagent');
const EventEmitter = require('events');

var vehicleInfoRouter = {};
vehicleInfoRouter.make = Router();
vehicleInfoRouter.model = Router();
vehicleInfoRouter.engine = Router();
vehicleInfoRouter.trim = Router();

vehicleInfoRouter.make.get('/vehicleInfo/:year', (req, res) => {
  var makeTrigger = new EventEmitter();
  var year = req.params.year;
  request.get('https://api.edmunds.com/api/vehicle/v2/makes?' +
              '&year=' + year + '&view=basic&fmt=json&api_key=' +
              process.env.EDMUNDS_API)
  .end((err, data) => {
    if (err) console.log(err); // add error handler function
    makeTrigger.emit('finished', data);
  });
  makeTrigger.on('finished', (data) => {
    var parsed = JSON.parse(data.text);
    var makesArray = [];
    for (var i = 0; i < parsed.makes.length; i++) {
      var newMake = {};
      newMake.name = parsed.makes[i].name;
      newMake.niceName = parsed.makes[i].niceName;
      makesArray.push(newMake);
    }
    res.status(200).send(makesArray);
  });
});

vehicleInfoRouter.model.get('/vehicleInfo/:makeNiceName/:year', (req, res) => {
  var modelTrigger = new EventEmitter();
  var make = req.params.makeNiceName;
  var year = req.params.year;
  request.get('https://api.edmunds.com/api/vehicle/v2/' + make + '/models?' +
              'year=' + year + '&view=basic&fmt=json&api_key=' +
              process.env.EDMUNDS_API)
  .end((err, data) => {
    if (err) console.log(err); // add error handler function
    modelTrigger.emit('finished', data);
  });
  modelTrigger.on('finished', (data) => {
    res.status(200).json(data);
  });
});

vehicleInfoRouter.engine.get('/vehicleInfo/:styleId', (req, res) => {
  var engineTrigger = new EventEmitter();
  var styleId = req.params.styleId;
  request.get('https://api.edmunds.com/api/vehicle/v2/styles/' + styleId +
              '/engines?fmt=json&api_key=' + process.env.EDMUNDS_API)
  .end((err, data) => {
    if (err) console.log(err); // add error handler function
    engineTrigger.emit('finished', data);
  });
  engineTrigger.on('finished', (data) => {
    res.status(200).json(data);
  });
});

vehicleInfoRouter.trim.get('/vehicleInfo/:', (req, res) => {
  var trimTrigger = new EventEmitter();

  request.get('xxxx' + process.env.EDMUNDS_API)
  .end((err, data) => {
    if (err) console.log(err);  // add error handler function
    trimTrigger.emit('finished', data);
  });
  trimTrigger.on('finshed', (data) => {
    res.status(200).json(data);
  });
});

module.exports = exports = vehicleInfoRouter;
