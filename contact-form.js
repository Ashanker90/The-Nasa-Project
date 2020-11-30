// Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyDv0Lb1ALTTOevFhJ0pohfUA6ur4nbE6CI",
    authDomain: "web-dev---contact-form.firebaseapp.com",
    databaseURL: "https://web-dev---contact-form.firebaseio.com",
    projectId: "web-dev---contact-form",
    storageBucket: "web-dev---contact-form.appspot.com",
    messagingSenderId: "442150820502",
    appId: "1:442150820502:web:5df066e05afe3b3b7000b7",
    measurementId: "G-E262L8YYG9"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();


  //Reference messages collection
var messageRef = firebase.database().ref('message');
// Listen for form Working
document.getElementById("contactForm").addEventListener('submit', SubmitForm);
//submit form
function SubmitForm(e) {
  e.preventDefault();
  //Get values
  var name = getInputVal('name')
  var email = getInputVal('email')
  var message = getInputVal('message')

  //save message
saveMessage(name,email,message);

//show alert
document.querySelector('.alert').style.display = 'block';

//hide alert ater 3 seconds
setTimeout(function(){
  document.querySelector('.alert').style.display = 'none';
},3000);

document.getElementById('contactForm').reset();
}



//Function to get form values
function getInputVal(id){
  return document.getElementById(id).value;
}

//save message to firebase
function saveMessage(name,email,message){
  var newMessageRef = messageRef.push();
  newMessageRef.set({
    name: name,
    email: email,
    message:message
  })
}
