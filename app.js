// Boilerplate setup

express = require('express');
bodyParser = require('body-parser');
app = express();
var SerialPort = require('serialport');
var port = new SerialPort('/dev/tty.usbmodem1431');


app.set('port', (process.env.PORT || 8080));
app.use(bodyParser.json({type: 'application/json'}));
server = app.listen(app.get('port'), function () {
  console.log('App listening on port %s', server.address().port);
  console.log('Press Ctrl+C to quit.');
});


port.on('open', function(){
  console.log('Serial Port Opend');
  port.on('data', function(data){
      console.log(data);
  });
});

// Create an instance of ApiAiAssistant
app.post('/', function (req, res) {
  console.log("entered");
  var requestBody = "";

  req.on('data', function(data){
    requestBody+=data;
  });

  req.on('end', function(){
    var responseBody = {};
    console.log(requestBody);
    if(requestBody == 'start')
    {
      port.write('1', function(err) {
        if (err) {
          return console.log('Error on write: ', err.message);
        }
        console.log('message written');
      });
    }

   if(requestBody == 'stop')
   {
     port.write('0', function(err) {
       if (err) {
         return console.log('Error on write: ', err.message);
       }
       console.log('message written');
     });
   }


    res.statusCode = 200;
    res.contentType('application/json');
    res.send(responseBody);
  });

})

// Start the server
