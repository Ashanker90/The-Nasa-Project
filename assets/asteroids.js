var today = new Date();
var start_date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

var req = new XMLHttpRequest();
var url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${start_date}&api_key=`;
var api_key = "wGXhi7fLKdBmDP5PdNR5Eu3N4JOvJ9lez2UnnqwJ";

req.open("GET", url + api_key);
req.send();

req.addEventListener("load", function(){
	if(req.status == 200 && req.readyState == 4){
  	var response = JSON.parse(req.responseText);
    document.getElementById("name").textContent = response.name;
		document.getElementById("id").textContent = response.id;
		document.getElementById("neo_reference_id").textContent = response.neo_reference_id;
    document.getElementById("is_potentially_hazardous_asteroid").textContent = response.is_potentially_hazardous_asteroid;
    document.getElementById("close_approach_data").src = response.close_approach_data;
    document.getElementById("orbital_data").textContent = response.orbital_data;
  }
})
