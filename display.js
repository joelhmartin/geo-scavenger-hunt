'use strict';

// DISPLAYS------------------------
function displayNextClueButton() {
  document.getElementById("get-next-clue").style.display = "block";
}

function displayStartOverButton() {
  document.getElementById("start-over-button").style.display = "block";
  document.getElementById("start-tracking").remove();
}

function displayTrackingButtion() {
  document.getElementById("start-tracking").style.display = "block";
}

function displayClue() {
  let clue = landmarks[currentIndex].clue;
  document.getElementById("clue").innerHTML = `<p>${clue}</p>`;
}
  
function displayPicture() {
  document.getElementById("image").setAttribute("src", landmarks[currentIndex].image);
}

function displaySuccess() {
  document.getElementById("how-close").innerHTML = 'YOU FOUND IT! ClICK TO GET THE NEXT CLUE!';
  setTimeout(() => {
    document.getElementById("how-close").innerHTML = '&nbsp;';
  }, 2000);
}


function displayHowClose(dFromTarget) {
  document.getElementById("how-close").innerHTML = `You are ${Math.round(dFromTarget)} meters away from the landmark`;
}

function displayWin() {
  document.getElementById("clue").innerHTML = "";
  document.getElementById("clue").innerHTML = "Congratulations! You have found all the landmarks.";
  document.getElementById("image").remove();
  document.getElementById("how-close").innerHTML = '';
  let img = document.createElement('img');
  img.src = 'images/you-win.jpg';
  document.getElementById('picture').appendChild(img);
}

// REMOVAL-----------------------
function removeNextClueButton() {
  document.getElementById("get-next-clue").style.display = "none";
}

function removeStartButton() {
  document.getElementById("start-game").style.display = "none";
  document.getElementById("main").style.display = "block";
}

function removeTrackingButton() {
  document.getElementById("start-tracking").style.display = "none";
}

// INTERACTIVE-------------------
function updateImageBlur(dFromTarget) {
  let blur = (Math.min(20, (Math.max(0, dFromTarget / 50)))); // adjust blur based on distance
  console.log(blur)
  document.getElementById('image').style.filter = `blur(${blur}px)`;
}

let blinkInterval;

function toggleBlink(toggle) {
  if (toggle) {
    blinkInterval = setInterval(() => {
      let isTracking = document.getElementById("start-tracking");
      if (isTracking.style.color === "red") {
        isTracking.style.color = "black";
      } else {
        isTracking.style.color = "red";
      }
    }, 500);
  } else {
    clearInterval(blinkInterval);
    document.getElementById("start-tracking").style.color = "black";
  }
}