function GetAllMembers() {

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
    xhttp.open("GET", "http://localhost:8080/members", true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send();
}

function GetMember() {

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
    xhttp.open("GET", "http://localhost:8080/members/1", true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send();
}