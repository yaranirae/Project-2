// Ni-Yara - Countdown
let countDownDate = new Date("Jan 26, 2024 15:00:00").getTime();
// let countDownDate = new Date("Jan 26, 2024 09:52:00").getTime();

const container = document.getElementById('home');

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
  if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
    stopCounter();
    welcome();
  }
});

function welcome() {
  document.querySelector(".data-jan").innerHTML = ''
  document.querySelector(".time-content").innerHTML = ''
  document.querySelector(".visit-us").innerHTML = ''

  let newWelcom = document.createElement("p");
  let chang = document.getElementById("changing");
  container.appendChild(newWelcom);
  chang.innerHTML = 'Hurray! The open days have started today!🥳🥳'
  newWelcom.classList.add("software-dev-open");


}

let myDate = new Date();
let hrs = myDate.getHours();
let mins = myDate.getMinutes();
let greet;


if (hrs >= 6 && hrs <= 11.59) {
  greet = "Good Morning ☀️";
}
else if (hrs >= 12 && hrs <= 17.59) {

  greet = "Good Afternoon 🌇";
}
else {
  greet = "Good Evening 🌃";
}

document.getElementById("TIME").innerHTML = `<br><p>${greet}</p>`;
document.getElementById("TIME").classList.add('software-dev-open')

// Ni-Yara Chatbot
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const chatbox = document.querySelector(".chatbox");
const chatbotToggler = document.querySelector(".chatbot-toggler");
const chatbotCloseBtn = document.querySelector(".close-btn");

let userMessage;
const API_KEY = "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";
const inputInitHeight = chatInput.scrollHeight;

const createChatLi = (message, className) => {
  const chatli = document.createElement("li");
  chatli.classList.add("chat", className);
  let chatContent =
      className === "outgoing"
          ? `<p>${message}</p>`
          : `<span class="material-symbols-outlined"><i class="fa-solid fa-robot"></i></span><p>${message}</p>`;
  chatli.innerHTML = chatContent;
  return chatli;
};

const generateResponse = (incomingChatLi) => {
  const API_URL = "https://api.openai.com/v1/chat/completions";
  const messageElement = incomingChatLi.querySelector("p");

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: userMessage },
      ],
    }),
  };

  fetch(API_URL, requestOptions)
      .then((res) => res.json())
      .then((data) => {
        messageElement.textContent = data.choices[0].message.content;
      })
      .catch((error) => {
        messageElement.classList.add("error");
        messageElement.textContent = "Oops! Something went wrong. Please try again!";
      })
      .finally(() => chatbox.scrollTo(0, chatbox.scrollHeight));
};

const handelChat = () => {
  userMessage = chatInput.value.trim();
  if (!userMessage) return;
  chatInput.value = "";
  chatInput.style.height = `${inputInitHeight}px`;

  const outgoingChatLi = createChatLi(userMessage, "outgoing");
  chatbox.appendChild(outgoingChatLi);
  chatbox.scrollTo(0, chatbox.scrollHeight);

  setTimeout(() => {
    const incomingChatLi = createChatLi("Typing...", "incoming");
    chatbox.appendChild(incomingChatLi);
    chatbox.scrollTo(0, chatbox.scrollHeight);
    generateResponse(incomingChatLi);
  }, 600);
};

chatInput.addEventListener("input", () => {
  chatInput.style.height = `${inputInitHeight}px`;
  chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
    e.preventDefault();
    handelChat();
  }
});

sendChatBtn.addEventListener("click", handelChat);
chatbotCloseBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));


