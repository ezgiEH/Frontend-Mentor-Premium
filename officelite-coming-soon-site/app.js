var countDownDate = new Date("May 14, 2023 00:00:00").getTime();

// Update the countdown every second
var x = setInterval(function () {

  // Get the current time
  var now = new Date().getTime();

  // Calculate the distance between now and the count down date
  var distance = countDownDate - now;

  // Calculate days, hours, minutes and seconds left
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Output the result in an element with id="countdown"
  //   document.getElementById("countdown").innerHTML = days + "d " + hours + "h "
  //   + minutes + "m " + seconds + "s ";
  document.getElementById("days").innerHTML = days >= 10 ? days : "0" + days
  document.getElementById("hours").innerHTML = hours >= 10 ? hours : "0" + hours
  document.getElementById("minutes").innerHTML = minutes >= 10 ? minutes : "0" + minutes
  document.getElementById("seconds").innerHTML = seconds >= 10 ? seconds : "0" + seconds

  // If the countdown is over, show "EXPIRED"
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("countdown").innerHTML = "WE WIN!";
  }
}, 1000);


//Validation

const form = document.getElementById('signUp-form');
const error = document.getElementById('error');


form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const phone = document.getElementById('phone');
  const company = document.getElementById('company');
  const options = document.getElementById('packs');

  console.log(options);
  if (name.value === '') {
    name.classList.add('error')
    return;
  }
  if (email.value === " " || !validateEmail(email.value)) {
    email.classList.add('error')
    return;
  }
  if (phone.value === " " || !validatePhone(phone.value)) {
    phone.classList.add('error')
    return;
  }
  if (options.selectedOptions.length !== 3) {
    options.classList.add('error')
    return;
  }
  if (company.value === " ") {
    company.classList.add('error')
    return;
  }

  this.submit();
})


// validate email format function
function validateEmail(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

// validate phone number format function
function validatePhone(phone) {
  const re = /^[0-9]{11}$/;
  return re.test(phone);
}

var inputElements = document.getElementsByTagName("input");
for (var i = 0; i < inputElements.length; i++) {
  inputElements[i].addEventListener("input", function () {
    document.getElementById(this.id).classList.remove("error");
  });
}