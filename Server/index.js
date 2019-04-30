
var express = require('express');
var app = express();
var path = require('path');
app.use(express.static('assets'))

// viewed at http://localhost:8080
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/../index.html'));
});

app.listen(8080);


var server = require('ws').Server;
var wss = new server({ port: 5001 });
// creating server on port 5001 localhost 

wss.on('connection', function (ws) {

    //on message event 
    ws.on('message', (data) => {
        console.log(data);
        // var jsonObject = JSON.parse(data);
        // var username = jsonObject.name;
        // var message = jsonObject.message;

        //broadcast data to all clients 
        wss.clients.forEach(function e(client) {
            client.send(data);
        })
    });

    ws.on('close', function () {
        console.log('Connection terminated..Closing Client');
    });
})