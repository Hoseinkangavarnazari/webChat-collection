var express = require('express');
var app = express();
var path = require('path');
app.use(express.static('assets'));
var id=0;
// viewed at http://localhost:8080
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/../index.html'));
});
app.get('/randomid', function(req, res) {
    console.log("ID Generated : ", id);
    id++;
    res.send(id);
});

app.listen(8080);


var server = require('ws').Server;
var wss = new server({ port: 5001 });
// creating server on port 5001 localhost
global.massages = [];
wss.on('connection', function (ws) {
    //on message event
    massages.forEach(function (m) {
        ws.send(m);
    });

    ws.on('message', (data) => {
        console.log(data);
        // var jsonObject = JSON.parse(data);
        // var username = jsonObject.name;
        // var message = jsonObject.message;
        massages.push(data);
        console.log(massages);


        //broadcast data to all clients
        wss.clients.forEach(function e(client) {
            client.send(data);
            //client.send(massages);
        })
    });

    ws.on('close', function () {
        console.log('Connection terminated..Closing Client');
    });
});
