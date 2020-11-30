let today = new Date();

const date = today.getFullYear();
const yearEnd = today.getFullYear();

function submit() {
  const title = document.getElementById("title").value;
  let yearEnd = document.getElementById("endYear").value;
  let yearStart = document.getElementById("startYear").value;

  if (yearEnd == "") {
    yearEnd = date;
  }
  if (yearStart == "") {
    yearStart = 1500;
  }

  if (yearEnd < yearStart || yearStart < 1 || yearEnd > date) {
    alert("Error! Invalid data");
  } else {
    //let url = `https://images-api.nasa.gov/search?title=${title}&media_type=image`;

    let newUrl = `https://images-api.nasa.gov/search?title=${title}&year_start=${yearStart}&year_end=${yearEnd}&media_type=image`;
    getResponse(newUrl);
  }
}

function populateYear(yearStart, yearEnd, dataElement) {
  if (yearEnd < yearStart) {
    alert("Error! The start date is later than the end");
  } else {
    try {
      for (let i = yearEnd; i >= yearStart; i--) {
        let option = document.createElement("option");
        option.setAttribute("value", i);
        dataElement.appendChild(option);
        //yearStartElement.appendChild(option);
      }
    } catch {
      alert("error");
    }
  }
}

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

  if (count < 100) {
    index = count;
  } else {
    index = 100;
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

  modalTitle.innerHTML = title;
  modalDescription.innerHTML = description;
  modalImg.setAttribute("src", url);
  modalDate.innerHTML = date;
  modal.style.display = "block";
}

let span = document.getElementsByClassName("close")[0];

span.onclick = function () {
  modal.style.display = "none";
};

const dataEl = document.getElementById("year");

populateYear(1600, yearEnd, dataEl);

function showDates() {
  var yearDiv = document.getElementById("year_entries");
  var addDates = document.getElementById("show_dates");
  if (yearDiv.style.display === "none") {
    yearDiv.style.display = "block";
    addDates.style.display = "none";
  } else {
    yearDiv.style.display = "none";
  }
}

