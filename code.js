"use strict";

var ContextRoot = "http://localhost:8080/members";

function createRequest() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        console.log("readyState:"+this.readyState);
        console.log("status:"+this.status);
        if (this.readyState == 4 && this.status == 200) {
            // Typical action to be performed when the document is ready:
            var response = xhttp.responseText;
            console.log("ok"+response);
            alert("response:"+response);
        }
    };

    return xhttp;
}


function Get(uri) {
    var xhttp = createRequest();
    xhttp.open("GET", uri, true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send();  
}

// POST is for insterting a new element
function PostMember() {
    var xhttp = createRequest();
    xhttp.open("POST", ContextRoot, true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send('{"id":7,"surname":"Merkel","name":"Angela"}');  
}

// PUT is for changeing an element
function PutMember() {
    var xhttp = createRequest();
    xhttp.open("PUT", ContextRoot, true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send('{"id":1,"surname":"Curie","name":"Marie"}');  
}


function GetAllMembers() {
    Get(ContextRoot);
}

function GetMember() {
    Get(ContextRoot.concat("/1"));

}