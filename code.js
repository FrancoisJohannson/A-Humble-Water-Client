"use strict";

const ContextRoot = "http://localhost:8080/chinesewords";

let tmpid = undefined;

function request(verb,url,body) {
    return new Promise(function(resolve, reject) {
      const xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function(e) {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(xhr.responseText);
            document.getElementById("p1").innerHTML = "status:"+xhr.status; //+" ,response="+xhr.responseText;
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

    let orig = document.getElementById("orig").value;
    let means = document.getElementById("means").value;

    let sjson = '{"id":'+id+',"means":"'+means+'","orig":"'+orig+'"}';

    await request('POST',ContextRoot,sjson);
    GetAll();
}

async function CopyOne(id) {
    let r = await request('GET',ContextRoot);
    let as = JSON.parse(r);

    for (let i = 0; i < as.length; i++) {
        if ( as[i].id==id ) {
            document.getElementById("orig").value = as[i].orig;
            document.getElementById("means").value = as[i].english;
            tmpid = id;
        }
    }

}

// PUT is for changeing an element
async function PutOne() {
    let id = tmpid;
    let orig = document.getElementById("orig").value;
    let means = document.getElementById("means").value;

    let sjson = '{"id":'+id+',"means":"'+means+'","orig":"'+orig+'"}';

    await request('PUT',ContextRoot,sjson);
    GetAll();
}

async function DeleteOne(id) {
    await request('DELETE',ContextRoot.concat("/").concat(id));
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
            row.innerText = as[i].orig+" "+as[i].means;

            let buttdel = document.createElement('button');
            buttdel.innerHTML = "Del";
            buttdel.style = "float: right;";
            buttdel.style.color='red';
            buttdel.value = as[i].id;
            buttdel.addEventListener ("click", function() {
                DeleteOne(this.value);
            });
            row.appendChild(buttdel);

            let buttchg = document.createElement('button');
            buttchg.innerHTML = "Copy";
            buttchg.style = "float: right;";
            buttchg.value = as[i].id;
            buttchg.addEventListener ("click", function() {
                CopyOne(this.value);
            });
            row.appendChild(buttchg);


            document.body.appendChild(row);
    }
}

async function GetOne() {
    const r = await request('GET',ContextRoot.concat("/1"));
}