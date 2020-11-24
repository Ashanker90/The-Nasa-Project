// Listen for form Submit
document.getElementById("contactForm").addEventListener("click", SubmitForm);

function SubmitForm(e) {
  console.log(e);
  e.preventDefault();

  console.log(123);
}
