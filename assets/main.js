var ws = new WebSocket('ws://localhost:5001');


// generating new id for every user
function randomID() {
    return Math.floor(Math.random() * 1e11);
}

//set default name for nickname in ex scenarios
var Nickname = "JOHN DOE";

ws.onopen = function () {

    console.log('Successfully connected to the server');

    // get user ID if it's available or generating one
    var userID = localStorage.getItem("userID") || randomID();
    //save userID in local storage of browser 
    localStorage.setItem("userID", userID);

    // making reference to User Nickname with UserID 
    if (localStorage.getItem(userID + "NAME")) {
        Nickname = localStorage.getItem(userID + "NAME");
    } else {
        // when there isn't any userID available get new Nickname from user 
        Nickname = prompt("What is your Nickname ?");

        console.log("User nickname with userID " + userID + " is ", Nickname);

        //set Nickname user in localstorage of browser 
        localStorage.setItem(userID + "NAME", Nickname);
    }
}

ws.onmessage = function (data) {

    // here we should add new messages received from another clients 
    console.log("Data received from server (socket)", data);

    //parse data
    var jsonObject = JSON.parse(data.data);
    var username = jsonObject.name;
    var message = jsonObject.message;
    //make new dynamic post on messages box
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

    // make sure always last message shown on messages box
    objDiv.scrollTop = objDiv.scrollHeight;
}


ws.onclose = function (e) {
    console.log("The connection with server lost : ", e);
}


function sendMessage() {
    var text = document.getElementById("message_input").value;
    document.getElementById("message_input").value = "";

    //if the input is empty do nothing 
    if (text) {
        var newMsg = {
            name: Nickname,
            message: text
        }

        console.log("The message is : " + newMsg);

        // we have to make strings for using send method on ws
        ws.send(JSON.stringify(newMsg));
    }
    else {
        return;
    }
}



// send  message after pushing enter button
var message_input = document.getElementById("message_input");
message_input.addEventListener("keydown", function (e) {
    if (e.keyCode === 13) {  //checks whether the pressed key is "Enter"
        sendMessage();
    }
});