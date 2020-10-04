function submit() {
  let title = document.getElementById("title").value;
  let req = new XMLHttpRequest();
  let url = `https://images-api.nasa.gov/search?title=${title}&media_type=image`;

  req.open("GET", url);
  req.send();
  
  // debugger;
  // let response = JSON.parse(req.responseText)
}

// req.addEventListener("load", function(){
// 	if(req.status == 200 && req.readyState == 4){
//   	let response = JSON.parse(req.responseText);
//     // document.getElementById("url_1").textContent = response.title;
//     // document.getElementById("date").textContent = response.date;
//     // document.getElementById("pic").src = response.hdurl;
//     // document.getElementById("explanation").textContent = response.explanation;
//     let index = if
//     for()
//   }
// })

// if retrive_coount < 10 
// 	i = retrive_coount
// else
// 	i = 10

// url_i
// description_i
// date_i
// title_i
