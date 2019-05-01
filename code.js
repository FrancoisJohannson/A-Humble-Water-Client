"use strict";

const ContextRoot = "http://localhost:8080/members";


function request(verb,url,body) {
    return new Promise(function(resolve, reject) {
      const xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function(e) {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(xhr.responseText);
            document.getElementById("p1").innerHTML = "status:"+xhr.status+" ,response="+xhr.responseText;
          } else {
            reject(xhr.status);
            document.getElementById("p1").innerHTML = "status:"+xhr.status+" ,response="+xhr.responseText;
          }
          
        }
      }
      xhr.ontimeout = function () {
        reject('timeout');
      }
      xhr.open(verb, url, true);

      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      
      if (body ) {
        xhr.send(body);
      }
      else {
        xhr.send();
      }

    })
  }


 function removeElementsByClass(className) {
    let elements = document.getElementsByClassName(className);
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
}


function getMaxId(as) {
    let maxid = 1;
    for (let i = 0; i < as.length; i++) {
        if (as[i].id > maxid) {
            maxid = as[i].id;
        }
    }
    return maxid;
}

// POST is for insterting a new element
async function PostOne() {
    let r = await request('GET',ContextRoot);
    let as = JSON.parse(r);
    let id = getMaxId(as)+1;

    let hanzi = document.getElementById("hanzi").value;
    let english = document.getElementById("english").value;

    let sjson = '{"id":'+id+',"english":"'+english+'","hanzi":"'+hanzi+'"}';

    request('POST',ContextRoot,sjson);
    GetAll();
}

// PUT is for changeing an element
function PutOne() {
    let sjson = '{"id":1,"english":"Curie","hanzi":"Marie2"}';
    request('PUT',ContextRoot,sjson);
}

function DeleteOne(id) {
    request('DELETE',ContextRoot.concat("/").concat(id));
    GetAll();
}

async function GetAll() {
    let r = await request('GET',ContextRoot);
    let as = JSON.parse(r);

    removeElementsByClass("itemline");
    for (let i = 0; i < as.length; i++) {
        let row = document.createElement('p');
            row.classList.add("itemline");
            row.style.border = '1px solid lightblue';
            row.innerText = as[i].id+" "+as[i].hanzi+" "+as[i].english;

            let butt = document.createElement('button');
            butt.innerHTML = "Del";
            butt.style = "float: right;";
            butt.value = as[i].id;
            butt.addEventListener ("click", function() {
                DeleteMember(this.value);
            });
            row.appendChild(butt);

            document.body.appendChild(row);
    }
}

async function GetOne() {
    const r = await request('GET',ContextRoot.concat("/1"));
}