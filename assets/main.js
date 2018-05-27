var ws = new WebSocket('ws://localhost:5001');

function randomID() {
    return Math.floor(Math.random() * 1e11);
}

var Nickname = "JOHN DOE";

ws.onopen = function () {
    console.log('connected');
    var userID = localStorage.getItem("userID") || randomID();
    localStorage.setItem("userID", userID);

    if (localStorage.getItem(userID + "NAME")) {
        Nickname = localStorage.getItem(userID + "NAME");
    } else {
        Nickname = prompt("What is your Nickname ?");
        console.info(Nickname);
        localStorage.setItem(userID + "NAME", Nickname);
    }
}

ws.onmessage = function (data) {

    // here we should add new messages received from another clients 
    console.log(data);
    var jsonObject = JSON.parse(data.data);
    var username = jsonObject.name;
    var message = jsonObject.message;

    var message_container = document.createElement("div");
    message_container.id = "message";
    var name = document.createElement("b");
    name.id = "id_name";

    name.appendChild(document.createTextNode(username));

    var message_data = document.createElement("p");
    message_data.id = "message_data";
    message_data.appendChild(document.createTextNode(message));


    message_container.appendChild(name);
    message_container.appendChild(message_data);

    var messagesBox = document.getElementById("messages");
    messagesBox.appendChild(message_container);

    var objDiv = document.getElementById("messages");
    objDiv.scrollTop = objDiv.scrollHeight;
}


ws.onclose = function () {
    console.log("closed websocket");
}


function sendMessage() {
    var text = document.getElementById("message_input").value;
    document.getElementById("message_input").value = "";
    if (text) {

        var newMsg = {
            name: Nickname,
            message: text
        }

        console.log(newMsg);

        ws.send(JSON.stringify(newMsg));
    }
    else {
        return;
    }
}

var message_input = document.getElementById("message_input");
message_input.addEventListener("keydown", function (e) {
    if (e.keyCode === 13) {  //checks whether the pressed key is "Enter"
        sendMessage();
    }
});