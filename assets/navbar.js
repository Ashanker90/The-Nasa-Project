function myFunction() {
  let navTop = document.getElementById("topnav");
  if (navTop.className === "topnav") {
    navTop.className += " responsive";
  } else {
    navTop.className = "topnav";
  }
}
