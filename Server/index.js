var server = require('ws').Server;

var wss = new server({ port: 5001 });

wss.on('connection', function (ws) {
    
    ws.on('message', (data) => {
        console.log(data);
        var jsonObject = JSON.parse(data);
        var username = jsonObject.name;
        var message = jsonObject.message;


        wss.clients.forEach(function e(client) {
            client.send(data);
        })

        // ws.clients.forEach(client => {
        //     client.send(message)
        // });

    });


    ws.on('close', function () {
        console.log('Connection terminated..Closing Client');
    });
})