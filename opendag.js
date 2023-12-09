const container = document.querySelector(".container");
const timeElement = document.querySelector(".time-content");

let countDownDate = new Date("Jan 26, 2024 00:00:00").getTime();

function stopCounter() {
  clearInterval(x);
}
const x = setInterval(function () {
  let now = new Date().getTime();
  let distance = countDownDate - now;
  
  let days = Math.floor(distance / (1000 * 60 * 60 * 24));
  let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
  document.getElementById("days").innerHTML = days;
  document.getElementById("hours").innerHTML = hours;
  document.getElementById("minutes").innerHTML = minutes;
  document.getElementById("seconds").innerHTML = seconds;
  
  
  if (days== 0 &&hours == 0 && minutes == 0 && seconds === 0) {
   stopCounter();
    welcom();
  }
});
function welcom() {
  document.querySelector(".time-content").innerHTML = ''
  let newWelcom = document.createElement("p");
  var chang = document.getElementById("changing");
  container.appendChild(newWelcom);
  chang.innerHTML = 'Hurrah open day has started'
  newWelcom.classList.add("software-dev-open");
  
  
}
// Raghda
let myDate = new Date();
let hrs = myDate.getHours();
let greet;
console.log(hrs);
if (hrs >= 6 && hrs <= 11.59) {
  greet = "Good Morning ☀️";
} else if (hrs >= 12 && hrs <= 17.59) {
  greet = "Good Afternoon 🌇";
} else {
  greet = "Good Evening 🌃";
}
document.getElementById("TIME").innerHTML = `<br><p>${greet}</p>`;
document.getElementById("TIME").classList.add('software-dev-open')