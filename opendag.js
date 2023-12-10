// Ni-Yara - Countdown
let countDownDate = new Date("Jan 26, 2024 00:00:00").getTime();
function stopCounter() {
  clearInterval(x)
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
  document.querySelector(".data-jan").innerHTML = ''
  document.querySelector(".time-content").innerHTML = ''
  let newWelcom = document.createElement("p");
  var chang = document.getElementById("changing");
  container.appendChild(newWelcom);
  chang.innerHTML = 'Hurrah open day has started'
  newWelcom.classList.add("software-dev-open");
  
  
}
// Raghda

// Raghda - Welcome greeting
let myDate = new Date();
let hrs = myDate.getHours();
let mins = myDate.getMinutes();
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

// Ni-Yara - Chatbot
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const chatbox = document.querySelector(".chatbox");
const chatbotToggler= document.querySelector(".chatbot-toggler");
const chatbotCloseBtn= document.querySelector(".close-btn")

let userMessage;
const API_KEY = "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";
const inputInitHeight = chatInput.scrollHeight;

const createChatLi = (message, className) => {
  const chatLi = document.createElement("li");
  chatLi.classList.add("chat", className);
  chatLi.innerHTML = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined"><i class="fa-solid fa-robot"></i></span><p></p>`;
  chatLi.querySelector("p").textContent = message;
  return chatLi;
}

const generateResponse = (incomingChatLi) =>{
  const API_URL = "https://api.openai.com/v1/chat/completions";
  const messageElement = incomingChatLi.querySelector("p");

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo-0613",
      messages: [{role: "user", content: userMessage}]
    })
  }

  fetch(API_URL, requestOptions).then(res => res.json()).then(data => {
    messageElement.textContent = data.choices[0].message.content;
  }).catch((error) => {
    messageElement.classList.add("error")
    messageElement.textContent = "Oops! Something went wrong. Please try again.";
  }).finally(() => chatbox.scrollTo(0, chatbox.scrollHeight));
}
const handleChat = () => {
  userMessage = chatInput.value.trim();
  if(!userMessage) return;
  chatInput.value = "";
  chatInput.style.height = `${inputInitHeight}px`;

  chatbox.appendChild(createChatLi(userMessage, "outgoing"));
  chatbox.scrollTo(0,chatbox.scrollHeight);

  setTimeout(() => {
    const incomingChatLi = createChatLi("Typing...", "incoming")
    chatbox.appendChild(incomingChatLi);
    chatbox.scrollTo(0,chatbox.scrollHeight);
    generateResponse(incomingChatLi);
  },600);
}

chatInput.addEventListener("input", () =>{
  chatInput.style.height = `${inputInitHeight}px`;
  chatInput.style.height = `${chatInput.scrollHeight}px`;
})

chatInput.addEventListener("keydown", (e) =>{
  if(e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
    e.preventDefault();
    handleChat();
  }
})

sendChatBtn.addEventListener("click", handleChat );
chatbotCloseBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));
