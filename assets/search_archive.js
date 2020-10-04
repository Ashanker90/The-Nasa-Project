let req = new XMLHttpRequest();

function submit() {
  let title = document.getElementById("title").value;
  let url = `https://images-api.nasa.gov/search?title=${title}&media_type=image`;

  req.open("GET", url);
  req.send();
}

req.addEventListener("load", function(){
	if(req.status == 200 && req.readyState == 4){

  	  let response = JSON.parse(req.responseText);
  	  let count = response['collection']['metadata']['total_hits'];
  	  let data = response['collection']['items'];
  	  let index = 0

  	  if(count < 10){
        index = count
      } else {
      	index = 10
  	  }
      
      let i;

      
      for (i = 0; i < index; i++) {
        
      	createGrid(data[i].links[0].href, data[i].data[0].description, data[i].data[0].date_created, data[i].data[0].title, i);

      	// console.log(`index: i`)
      	// console.log(`url_${i}: ${data[i].links[0].href}`);
      	// console.log(`title_${i}: ${i}`);
      	// console.log(`description_${i}:`);
      	// console.log(`date_${i}: ${i}`);

      	// debugger;
      	// document.getElementById('index').textContent = i;
       //  document.getElementById(`url_${i}`).src = data[i].links[0].href;
       //  document.getElementById(`title_${i}`).textContent = data[i].links[0].href;
       //  document.getElementById(`description_${i}`).textContent = data[i].links[0].href;
       //  document.getElementById(`date_${i}`).textContent = data[i].links[0];
      }

  	// if()

    // document.getElementById("url_1").textContent = response.title;
    // document.getElementById("date").textContent = response.date;
    // document.getElementById("pic").src = response.hdurl;
    // document.getElementById("explanation").textContent = response.explanation;
    // let index = if
    // for()
  }
})

function createGrid(url, description, date, title, index) {
  console.log("function works");
  let div = document.createElement("DIV");
  let img = document.createElement("IMG");
  img.setAttribute(
    "src",
    "https://cdn.mos.cms.futurecdn.net/6bt6XEoX7uxVz8YAeGCzN9-970-80.jpg"
  );
  document.body.appendChild(img);
}

// if retrive_coount < 10 
// 	i = retrive_coount
// else
// 	i = 10

// url_i
// description_i
// date_i
// title_i
