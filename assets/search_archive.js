let req = new XMLHttpRequest();

function submit() {
  let title = document.getElementById("title").value;
  let url = `https://images-api.nasa.gov/search?title=${title}&media_type=image`;
  console.log("in submit");
  fetch("https://randomuser.me/api/?results=10")
    .then((resp) => resp.json()) // Transform the data into json
    .then(function (data) {
      console.log(data);
      console.log("here");
      // Create and append the li's to the ul
    });

  // fetch("https://randomuser.me/api/?results=10", {
  //   method: "GET",
  // })
  //   .then((res) => res.json)
  //   .then((data) => console.log(data));
  debugger;
  getResponse(url);
  req.open("GET", url);
  req.send();
}

//new promises
function getResponse(url) {
  (async () => {
    const res = await fetch(url);
    console.log("res " + res);
    console.log(res);

    debugger;
  })();
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
