const req = new XMLHttpRequest();
let today = new Date();
let start_date =
  today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
const api_key = "wGXhi7fLKdBmDP5PdNR5Eu3N4JOvJ9lez2UnnqwJ";
const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${start_date}&api_key=${api_key}`;

req.open("GET", url);
req.send();

req.addEventListener("load", function () {
  if (req.status == 200 && req.readyState == 4) {
    let response = JSON.parse(req.responseText);
    let asteroids = response.near_earth_objects[start_date];

    if (asteroids.length == 0) {
      body: "No asteroids for today.";
    } else {
      try {
        for (var i = 0; i < asteroids.length; i++) {
          createListItem(asteroids[i].name);
          // var obj = asteroids[todayDate][i];
          // var names = obj.name;
          // var lunarDistance = obj.close_approach_data[0].miss_distance.lunar;
          // var id = obj.id[0];
          // var neo_reference_id = obj.neo_reference_id;
          // var hazard = obj.is_potentially_hazardous_asteroid;
          // var close = obj.close_approach_data;
          // var orbit = obj.orbital_data;
        }
      } catch (err) {
        console.log("Caught error" + err);
      }
    }
  }

  //		document.getElementById("today-date").textContent = "start_date";
  //		document.getElementById("in-date").textContent = response.start_date;
  //  document.getElementById("name").textContent = response.name;
  //	document.getElementById("id").textContent = response.id;
  //	document.getElementById("neo_reference_id").textContent = response.neo_reference_id;
  //  document.getElementById("is_potentially_hazardous_asteroid").textContent = response.is_potentially_hazardous_asteroid;
  //  document.getElementById("close_approach_data").src = response.close_approach_data;
  //  document.getElementById("orbital_data").textContent = response.orbital_data;
});

function createListItem(name) {
  const list = document.getElementById("list");
  const li = document.createElement("LI");
  li.innerHTML = name;
  list.appendChild(li);
}
