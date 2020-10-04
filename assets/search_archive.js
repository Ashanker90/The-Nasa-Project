var ele = document.getElementById("submit");
var title = document.getElementById("title").value;

debugger;

if(ele.addEventListener){
    ele.addEventListener("submit", callback, false);
  }

function callback() {
  console.log(title);
}

var req = new XMLHttpRequest();
var title = document.getElementById("title").value;
var url = `https://images-api.nasa.gov/search?title=${title}`;
var api_key = "W8bRBkY5cEdSh2TrvFO58up2snPU6oZogHRJvHlT";

req.open("GET", url + api_key);
req.send();


req.addEventListener("load", function(){
	if(req.status == 200 && req.readyState == 4){
  	var response = JSON.parse(req.responseText);
    document.getElementById("title").textContent = response.title;
    document.getElementById("date").textContent = response.date;
    document.getElementById("pic").src = response.hdurl;
    document.getElementById("explanation").textContent = response.explanation;
  }
})