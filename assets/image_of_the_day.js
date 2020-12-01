let api_key = "eX1iUr6fbBWu4jibMyL56VFMEvsmdsAbldFCgTr5";
let today = new Date();
let date =
  today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
let url = `https://api.nasa.gov/planetary/apod?api_key=${api_key}&date=${date}`;

async function getResponse(url) {
  try {
    await fetch(url)
      .then((resp) => resp.json()) // Transform the data into json
      .then(function (data) {
        createElements(data);
      });
  } catch {
    alert("TELL NASA TO CODE BETTER. THE API BROKE");
  }
}

function createElements(response) {
  document.getElementById("title").textContent = response.title;
  document.getElementById("date").textContent = response.date;
  if (response.media_type === "image") {
    document.getElementById("pic").src = response.hdurl;
    sessionStorage.setItem("mediaType", "image");
  } else {
    document.getElementById("videos").src = response.hdurl;
  }
  document.getElementById("pic").src = response.hdurl;
  document.getElementById("explanation").textContent = response.explanation;
}

getResponse(url);

function showMedia() {
  if (sessionStorage.getItem("mediaType") === "image") {
    document.getElementById("video").style.display = "none";
  }
  else {
    document.getElementById("img").style.display = "none";
  }
}