"use strict";

var ContextRoot = "http://localhost:8080/members";


function request(url) {
    return new Promise(function(resolve, reject) {
      const xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function(e) {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(xhr.responseText);
            document.getElementById("p1").innerHTML = "status:"+xhr.status+" ,response="+xhr.responseText;
          } else {
            reject(xhr.status);
            //document.getElementById("p1").innerHTML = "status:"+xhr.status;
            document.getElementById("p1").innerHTML = "status:"+xhr.status+" ,response="+xhr.responseText;
          }
          
        }
      }
      xhr.ontimeout = function () {
        reject('timeout');
      }
      xhr.open('GET', url, true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.send();
    })
  }


function createRequest() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        
        if (this.readyState == 4 ) {
            if ( this.status == 200) {
            // Typical action to be performed when the document is ready:
            var response = xhttp.responseText;            
            }
            document.getElementById("p1").innerHTML = "status:"+this.status+" ,response="+xhttp.responseText;
        }
    };

    return xhttp;
}

/*
function Get(uri) {
    var xhttp = createRequest();
    xhttp.open("GET", uri, true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send();  
}
*/

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


async function GetAllMembers() {
    //Get(ContextRoot);
    const r = await request(ContextRoot);
    var as = JSON.parse(r);

    for (var i = 0; i < as.length; i++) {
        var row = document.createElement('p');
            row.style.border = '1px solid lightblue';
            row.innerText = as[i].id+" "+as[i].name+" "+as[i].surname;
            document.body.appendChild(row);
    }
}

async function GetMember() {
    const r = await request(ContextRoot.concat("/1"));
    //Get(ContextRoot.concat("/1"));

}