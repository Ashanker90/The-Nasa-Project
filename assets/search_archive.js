let req = new XMLHttpRequest();
let y = 0;

function submit() {
  let title = document.getElementById("title").value;
  let url = `https://images-api.nasa.gov/search?title=${title}&media_type=image`;

<<<<<<< HEAD
=======
  // fetch("https://randomuser.me/api/?results=10", {
  //   method: "GET",
  // })
  //   .then((res) => res.json)
  //   .then((data) => console.log(data));
>>>>>>> 2cf352d11db5b3c9dd7279159cc6ec9871a98fa8
  getResponse(url);
}

//new promises
<<<<<<< HEAD
async function getResponse(url) {
  try {
    await fetch(url)
      .then((resp) => resp.json()) // Transform the data into json
      .then(function (data) {
        parseData(data);
      });
  } catch {
    alert("TELL NASA TO CODE BETTER. THE API BROKE");
  }
=======
function getResponse(url) {
  (async () => {
    const res = await fetch(url);
    console.log("res " + res);
    console.log(res);
  })();
>>>>>>> 2cf352d11db5b3c9dd7279159cc6ec9871a98fa8
}

function clearGridItems() {
  const gridContainer = document.getElementById("grid-container");
  while (gridContainer.firstChild) {
    gridContainer.removeChild(gridContainer.lastChild);
  }
}

function parseData(json) {
  clearGridItems();

  let count = json["collection"]["metadata"]["total_hits"];
  let data = json["collection"]["items"];
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
  //}
}

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
