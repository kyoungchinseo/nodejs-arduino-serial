var express = require('express');
var router = express.Router();

var led1Status = false;
var led2Status = false; 
var msg1data = "";
var msg2data = "";

/* GET home page. */
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


var SerialPort = require("serialport").SerialPort

// Arduino가 /dev/tty-usbserial1 에 연결되었다고 가정합니다.
var serialPort = new SerialPort("/dev/tty.usbmodem1411", {
    baudrate: 9600
}, false);

serialPort.open(function () {
    console.log('serial port connected');
    serialPort.on('data', function(data) {
        console.log('data received: ' + data);

    });
    
    setInterval(function(){
        console.log('sending for LED1: '+ led1Status);
        console.log('sending for LED2: '+ led2Status);
        serialPort.write(led1Status ? "1" : "0", function(err, results) {
            
        });     
        serialPort.write(led2Status ? "3" : "2", function(err, results) {

        });
    }, 100);
});


module.exports = router;
