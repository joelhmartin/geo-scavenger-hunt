'use strict';

// Define Variables
let currentIndex = 0 // Defines how game will load
let landmarks = []; // Array to store landmarks
let found = []; // Array to store whether each landmark has been found
let unfoundIndex // Array to store how many landmarks have not been found

function getNextLandmark() {
  startTracking();
  displayTrackingButtion();
  displayClue();
  displayPicture();
  updateProgress();
  updateGameState();
  updateImageBlur(1000);
}
  
function startGame() {
  // Clear Start Game Button
  removeStartButton();
  // Display first clue and picture
  displayClue();
  displayPicture();
  updateProgress();
  updateGameState();
  navigator.geolocation.getCurrentPosition(checkLocation, noGeo, { enableHighAccuracy: true });

  if (unfoundIndex === -1){
    displayWin();
    displayStartOverButton();
  }
}

function main() {
  document.addEventListener('DOMContentLoaded', async () => {
    initializeMap();
    loadGameState();
    await loadLandmarks();
    initializeFoundArray();
    // Wait till landarks are loaded to add event listeners
    document.getElementById("start-game").addEventListener("click", startGame);
    document.getElementById("start-tracking").addEventListener("click", startTracking);
    document.getElementById("start-over-button").addEventListener("click", deleteLocalStorage);
    document.getElementById("get-next-clue").addEventListener("click", getNextLandmark)
    document.getElementById("get-next-clue").addEventListener("click", removeNextClueButton)
  });
}

main();