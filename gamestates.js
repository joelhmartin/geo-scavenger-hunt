'use strict';

function loadGameState() {
  // Load the game state from local storage
  let storedIndex = localStorage.getItem("currentIndex");
  let storedFound = localStorage.getItem("found");
  if (storedIndex !== null && storedFound !== null) {
    currentIndex = parseInt(storedIndex);
    found = JSON.parse(storedFound);
    document.getElementById("start-game").textContent = "Continue Game"
  }
  let storedWinStateJson = localStorage.getItem("unfoundIndex");
  let storedWinStateObj = JSON.parse(storedWinStateJson); 
  unfoundIndex = storedWinStateObj;
}

function initializeFoundArray() {
  // Initialize found array
  if (found.length === 0) {
    for (let i = 0; i < landmarks.length; i++) {
      found.push(false)
    }
  }
}

async function loadLandmarks() {
  // Load Landmark list from JSON file
  try {
    let response = await fetch("landmarks.json");
    let data = await response.json();
    landmarks = data.locations;
  } catch (e) {
    console.error(e);
  }
}

function updateProgress() {
  // Update the progress message in the footer
  let foundCount = found.filter(item => item === true).length;
  let totalCount = landmarks.length;
  let message = `You have found ${foundCount} out of ${totalCount} landmarks`;
  document.getElementById("progress").innerHTML = message;
}
    
function updateGameState() {
  // Update the game state in local storage
  localStorage.setItem("currentIndex", currentIndex);
  localStorage.setItem("found", JSON.stringify(found));
}

function updateWinState() {
  // Saves whether the game has been completed or not
  localStorage.setItem("unfoundIndex", -1);
}

function deleteLocalStorage() {
  localStorage.clear();
  location.reload(true);
}