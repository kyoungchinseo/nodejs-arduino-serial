var express = require('express');
var router = express.Router();


var led1Status = false;
var led2Status = false; 
var msg1data = "";
var msg2data = "";

router.get('/', function(req, res, next) {
  res.render('index', { title: 'NodeJs + Arduino', msg1: msg1data, msg2: msg2data });
});

router.post('/1', function(req, res) {
  led1Status = led1Status ? false : true;
  console.log(led1Status);
  if (led1Status) {
  	msg1data = "LED1 turned on";
  } else {
  	msg1data = "LED1 turned off";
  }
  res.render('index', {title: 'NodeJs + Arduino', msg1: msg1data, msg2: msg2data});
});

router.post('/2', function(req, res) {
  led2Status = led2Status ? false : true;
  console.log(led2Status);
  if (led2Status) {
  	msg2data = "LED2 turned on";
  } else {
  	msg2data = "LED2 turned off";
  }
  res.render('index', {title: 'NodeJs + Arduino', msg1: msg1data, msg2: msg2data });
}); 



var five = require('johnny-five');
var board = new five.Board();

var LED1 = 9;
var LED2 = 13;

board.on("ready", function() {
  this.pinMode(LED1,1);
  this.pinMode(LED2,1);
  this.loop(100, function() {
    this.digitalWrite(LED1, led1Status? 1: 0);
    this.digitalWrite(LED2, led2Status? 1: 0);
  });
});


module.exports = router;
