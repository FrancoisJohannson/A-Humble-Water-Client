"use strict";


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

function PostMember() {
    var xhttp = createRequest();
    xhttp.open("POST", "http://localhost:8080/members", true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send('{"id":6,"surname":"Gulbrannson","name":"Olaf"}');  
}

function GetAllMembers() {
    Get("http://localhost:8080/members");
}

function GetMember() {
    Get("http://localhost:8080/members/1");

}