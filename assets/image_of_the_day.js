let req = new XMLHttpRequest();
let api_key = "eX1iUr6fbBWu4jibMyL56VFMEvsmdsAbldFCgTr5";
let today = new Date();
let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
let url = `https://api.nasa.gov/planetary/apod?api_key=${api_key}&date=${date}`;

req.open("GET", url);
req.send();

req.addEventListener("load", function(){
	if(req.status == 200 && req.readyState == 4){
        let response = JSON.parse(req.responseText);
        document.getElementById("title").textContent = response.title;
        document.getElementById("date").textContent = response.date;
        document.getElementById("pic").src = response.url;
        document.getElementById("explanation").textContent = response.explanation;
  }
})