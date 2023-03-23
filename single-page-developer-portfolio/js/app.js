
function validateForm() {

  var nameInput = document.forms["contactForm"]["name"];
  var emailInput = document.forms["contactForm"]["email"];
  var messageInput = document.forms["contactForm"]["message"];

  // Hata mesajları gösteren div elementleri alınır
  var nameError = document.getElementById("nameError");
  var emailError = document.getElementById("emailError");
  var messageError = document.getElementById("messageError");

  // Get values of form elements
  var nameValue = nameInput.value.trim();
  var emailValue = emailInput.value.trim();
  var messageValue = messageInput.value.trim();

  // Checking the correctness of the namespace
  if (nameValue == "") {
    nameError.classList.remove("hidden");
    nameInput.classList.add("errorInput");
    return false;
  }

  // Checking the correctness of the e-mail field
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(emailValue)) {
    emailError.classList.remove("hidden");
    emailInput.classList.add("errorInput");
    return false;
  }

  // Checking the correctness of the message field
  if (messageValue == "") {
    messageError.classList.remove("hidden");
    messageInput.classList.add("errorInput");
    return false;
  }

  // Marking that the form has been submitted successfully
  alert("send succes!");
  return true;

}

// Hide error messages when one of the input fields is changed
var inputElements = document.getElementsByTagName("input");
for (var i = 0; i < inputElements.length; i++) {
  inputElements[i].addEventListener("input", function () {
    document.getElementById(this.id + "Error").classList.add("hidden");
    document.getElementById(this.id).classList.remove("errorInput");
  });
}


