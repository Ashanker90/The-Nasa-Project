let req = new XMLHttpRequest();
let y = 0;
function submit() {
  let title = document.getElementById("title").value;
  let url = `https://images-api.nasa.gov/search?title=${title}&media_type=image`;
  console.log("in submit");

  console.log(getResponse(url));

  //getResponse(url).then((res) => console.log(res));
  // .then((res) => res.json)
  // .then((data) => console.log(data));
  console.log("moving on");
  // fetch(url)
  //   .then((resp) => resp.json()) // Transform the data into json
  //   .then(function (data) {
  //     console.log(data);
  //     console.log("here");
  //   });

  // fetch("https://randomuser.me/api/?results=10", {
  //   method: "GET",
  // })
  //   .then((res) => res.json)
  //   .then((data) => console.log(data));

  // getResponse(url);
  // req.open("GET", url);
  // req.send();
}
let x = 0;
//new promises
async function getResponse(url) {
  let result;
  try{
    await fetch(url)
    .then((resp) => resp.json()) // Transform the data into json
    .then(function (data) {
      //console.log(data);
      result = data;
      //console.log("here");
    });
  }catch{
    alert("Tell NASA TO CODE BETTER. There was an error");
    result = null;
  }
  

  return result;
}

function clearGridItems() {
  const gridContainer = document.getElementById("grid-container");
  while (gridContainer.firstChild) {
    gridContainer.removeChild(gridContainer.lastChild);
  }
}

req.addEventListener("load", function () {
  clearGridItems();

  if (req.status == 200 && req.readyState == 4) {
    let response = JSON.parse(req.responseText);
    let count = response["collection"]["metadata"]["total_hits"];
    let data = response["collection"]["items"];
    let index = 0;

    if (count < 10) {
      index = count;
    } else {
      index = 10;
    }

    let i;

    for (i = 0; i < index; i++) {
      createGrid(
        data[i].links[0].href,
        data[i].data[0].description,
        data[i].data[0].date_created,
        data[i].data[0].title,
        i
      );
    }
  }
});

function createGrid(url, description, date, title, index) {
  let div = document.createElement("DIV");
  let img = document.createElement("IMG");
  div.setAttribute("class", "grid-item");
  div.setAttribute("title", title);
  div.setAttribute("description", description);
  div.setAttribute("date", date);
  div.setAttribute("imgUrl", url);
  div.setAttribute(
    "onclick",
    "popupImage(this.getAttribute('title'), this.getAttribute('description'), this.getAttribute('date'), this.getAttribute('imgUrl'))"
  );
  img.setAttribute("src", url);
  div.appendChild(img);
  const gridContainer = document.getElementById("grid-container");
  gridContainer.appendChild(div);
}

function popupImage(title, description, date, url) {
  const modal = document.getElementById("modal");
  const modalTitle = document.getElementById("modal-title");
  const modalDescription = document.getElementById("modal-description");
  const modalImg = document.getElementById("modal-img");
  const modalDate = document.getElementById("modal-date");

  console.log("modal titel" + modalTitle);
  modalTitle.innerHTML = title;
  modalDescription.innerHTML = description;
  modalImg.setAttribute("src", url);
  modalDate.innerHTML = date;
  modal.style.display = "block";
}

var span = document.getElementsByClassName("close")[0];

span.onclick = function () {
  modal.style.display = "none";
};
