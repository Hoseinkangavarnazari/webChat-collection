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