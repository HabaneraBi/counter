const p = document.getElementById("p");
const but = document.getElementById("but");
const inputs = document.querySelectorAll(".el_input");
const startButton = document.getElementById("start");
const content2 = document.getElementsByClassName("content2");
const closeBut = document.getElementById("close");
const buttons = document.getElementById("buttons");
const svg = document.getElementById("svg");
const stop = document.getElementById("stop");
const body = document.getElementsByTagName("body")[0];
const h1 = document.getElementById("h1");

let acting;
const openBut = document.createElement("button");

function mainProc() {
  const inpVal = [];
  inputs.forEach((el) => {
    inpVal.push(el.value);
  });
  if (inpVal.every((el) => el === "") && !localStorage.getItem("data")) {
    return;
  }
  startButton.disabled = true;
  stop.disabled = false;
  closeBut.disabled = false;
  stop.style.cursor = "pointer";
  closeBut.style.cursor = "pointer";
  let valTime = localStorage.getItem("data")
    ? localStorage.getItem("data")
    : timer(...inpVal);
  p.innerHTML = innering(...inpVal);

  content2[0].classList.add("content2_anima");
  buttons.classList.add("buttons_anima");
  inputs.forEach((el) => {
    el.value = "";
  });
  acting = setInterval(function () {
    if (valTime === 0) {
      p.innerHTML = "Завершено";
      localStorage.removeItem("data");
      return;
    }

    const forStyle = new Date();
    if (forStyle.getHours() >= 21 || forStyle.getHours() < 5) {
      body.style.backgroundImage = "url(kos.png)";
      h1.style.color = "white";
    } else {
      body.style.backgroundImage = "url(day.png)";
      h1.style.color = "black";
    }
    valTime -= 1000;
    localStorage.removeItem("data");
    localStorage.setItem("data", valTime);
    let sec = Math.floor(valTime / 1000) % 60;
    let min = Math.floor(valTime / 1000 / 60) % 60;
    let hour = Math.floor((valTime / 1000 / 60 / 60) % 24);
    let days = Math.floor(valTime / 1000 / 60 / 60 / 24);

    p.innerHTML = innering(days, hour, min, sec);
  }, 1000);
}

function timer(days, hours, minutes, seconds) {
  days = days * 24 * 60 * 60 * 1000;
  hours = hours * 60 * 60 * 1000;
  minutes = minutes * 60 * 1000;
  seconds = seconds * 1000;
  let time = days + hours + minutes + seconds;
  const date = new Date().getTime() + time;
  return date - new Date().getTime();
}

function innering(days, hours, min, sec) {
  return `${+days >= 10 ? days : "0" + +days}:${
    +hours >= 10 ? hours : "0" + +hours
  }:${+min >= 10 ? min : "0" + +min}:${+sec >= 10 ? sec : "0" + +sec}`;
}

if (localStorage.getItem("data")) {
  mainProc();
}

let flag = true;
closeBut.addEventListener("click", function () {
  if (flag) {
    content2[0].classList.remove("content2_anima");
    svg.innerHTML =
      '<circle r="8.5" cx="10" cy="10" stroke="black" stroke-width="3" fill="none"/>';
  } else {
    content2[0].classList.add("content2_anima");
    svg.innerHTML = svg.innerHTML =
      '<line x1="0" y1="0" x2="20" y2="20" stroke="black" stroke-width="3" /> <line x1="20" y1="0" x2="0" y2="20" stroke="black" stroke-width="3" />';
  }
  flag = !flag;
});

startButton.addEventListener("click", () => mainProc());

stop.addEventListener("click", function () {
  buttons.classList.remove("buttons_anima");
  content2[0].classList.remove("content2_anima");
  startButton.disabled = false;
  localStorage.removeItem("data");
  clearInterval(acting);
  stop.disabled = true;
  closeBut.disabled = true;
  stop.style.cursor = "auto";
  closeBut.style.cursor = "auto";
});
